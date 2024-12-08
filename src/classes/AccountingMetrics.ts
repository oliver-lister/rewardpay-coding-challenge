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
}
