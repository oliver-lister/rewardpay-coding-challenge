import { AccountData } from "../types/types";

class AccountingMetrics {
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
      (record) => record.accountType === "revenue",
    );
  }

  calculateExpenses(): number {
    return this.sumBasedOnCondition(
      (record) => record.accountType === "expenses",
    );
  }
}
