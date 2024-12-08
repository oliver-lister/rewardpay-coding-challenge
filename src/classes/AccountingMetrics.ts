import { AccountData } from "../types/types";

export class AccountingMetrics {
  constructor(private data: AccountData[]) {}

  private sumBasedOnCondition(
    predicate: (record: AccountData) => boolean,
  ): number {
    return this.data
      .filter(predicate)
      .reduce((sum, record) => sum + record.totalValue, 0);
  }

  calculateRevenue(): number {
    return this.sumBasedOnCondition(
      (record) => record.accountCategory === "revenue",
    );
  }

  calculateExpenses(): number {
    return this.sumBasedOnCondition(
      (record) => record.accountCategory === "expense",
    );
  }

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

  private calculateAssets(): number {
    const validAccountTypes = [
      "current",
      "bank",
      "current_accounts_receivable",
    ];
    return this.calculateCategoryNetValue("assets", validAccountTypes);
  }

  private calculateLiabilities(): number {
    const validAccountTypes = ["current", "current_accounts_payable"];
    return this.calculateCategoryNetValue("liability", validAccountTypes);
  }

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
