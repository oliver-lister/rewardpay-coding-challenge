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

  private calculateAssets(): number {
    const validAccountTypes = [
      "current",
      "bank",
      "current_accounts_receivable",
    ];

    const isValidAccountType = (accountType: string): boolean =>
      validAccountTypes.includes(accountType);

    const isAssetRecord = (record: AccountData, valueType: string): boolean =>
      record.accountCategory === "assets" &&
      record.valueType === valueType &&
      isValidAccountType(record.accountType);

    const debitAssets = this.sumBasedOnCondition((record) =>
      isAssetRecord(record, "debit"),
    );

    const creditAssets = this.sumBasedOnCondition((record) =>
      isAssetRecord(record, "credit"),
    );

    return debitAssets - creditAssets;
  }
}
