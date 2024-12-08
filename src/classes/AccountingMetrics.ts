import { AccountData } from "../types/types";

export class AccountingMetrics {
  constructor(private data: AccountData[]) {}

  /**
   * Sums the totalValue of records that match a given condition.
   * @param predicate - A function that specifies the condition to filter records.
   * @returns The sum of totalValue for the filtered records.
   */
  private sumBasedOnCondition(
    predicate: (record: AccountData) => boolean,
  ): number {
    return this.data
      .filter(predicate)
      .reduce((sum, record) => sum + record.totalValue, 0);
  }

  /**
   * Calculates the total revenue from account data.
   * @returns The total revenue as a number.
   */
  calculateRevenue(): number {
    return this.sumBasedOnCondition(
      (record) => record.accountCategory === "revenue",
    );
  }

  /**
   * Calculates the total expenses from account data.
   * @returns The total expenses as a number.
   */
  calculateExpenses(): number {
    return this.sumBasedOnCondition(
      (record) => record.accountCategory === "expense",
    );
  }

  /**
   * Calculates the gross profit margin.
   * @throws If revenue is zero, throws an error.
   * @returns The gross profit margin as a fraction of revenue.
   */
  calculateGrossProfitMargin(): number {
    const grossProfit = this.sumBasedOnCondition(
      (record) =>
        record.accountType === "sales" && record.valueType === "debit",
    );

    const revenue = this.calculateRevenue();

    if (revenue === 0) {
      throw new Error(
        "Revenue cannot be zero when calculating Gross Profit Margin.",
      );
    }

    return grossProfit / revenue;
  }

  /**
   * Calculates the net profit margin.
   * @throws If revenue is zero, throws an error.
   * @returns The net profit margin as a fraction of revenue.
   */
  calculateNetProfitMargin(): number {
    const revenue = this.calculateRevenue();

    if (revenue === 0) {
      throw new Error(
        "Revenue cannot be zero when calculating Net Profit Margin.",
      );
    }

    const expenses = this.calculateExpenses();
    const netProfit = revenue - expenses;

    return netProfit / revenue;
  }

  /**
   * Calculates the net value for a specific account category (e.g., assets or liabilities).
   * @param category - The account category ("assets" or "liability").
   * @param validAccountTypes - Array of valid account types for the category.
   * @throws If the category is invalid, throws an error.
   * @returns The net value (debits - credits) for the specified category.
   */
  private calculateCategoryNetValue(
    category: "assets" | "liability",
    validAccountTypes: string[],
  ): number {
    if (!["assets", "liability"].includes(category)) {
      throw new Error(`Invalid category: ${category}`);
    }

    const isValidAccountType = (accountType: string): boolean =>
      validAccountTypes.includes(accountType);

    const isRecordOfType = (record: AccountData, valueType: string): boolean =>
      record.accountCategory === category &&
      record.valueType === valueType &&
      isValidAccountType(record.accountType);

    const debitTotal = this.sumBasedOnCondition((record) =>
      isRecordOfType(record, "debit"),
    );

    const creditTotal = this.sumBasedOnCondition((record) =>
      isRecordOfType(record, "credit"),
    );

    return debitTotal - creditTotal;
  }

  /**
   * Calculates the total assets from account data.
   * @returns The total assets as a number.
   */
  calculateAssets(): number {
    const validAccountTypes = [
      "current",
      "bank",
      "current_accounts_receivable",
    ];
    return this.calculateCategoryNetValue("assets", validAccountTypes);
  }

  /**
   * Calculates the total liabilities from account data.
   * @returns The total liabilities as a number.
   */
  calculateLiabilities(): number {
    const validAccountTypes = ["current", "current_accounts_payable"];
    return this.calculateCategoryNetValue("liability", validAccountTypes);
  }

  /**
   * Calculates the working capital ratio (assets/liabilities).
   * @throws If liabilities are zero, throws an error.
   * @returns The working capital ratio as a number.
   */
  calculateWorkingCapitalRatio(): number {
    const liabilities = this.calculateLiabilities();
    if (liabilities === 0) {
      throw new Error(
        "Liabilities cannot be zero when calculating Working Capital Ratio.",
      );
    }
    const assets = this.calculateAssets();

    return assets / liabilities;
  }
}
