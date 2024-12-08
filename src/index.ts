import { DataReader } from "./classes/DataReader";
import { AccountingMetrics } from "./classes/AccountingMetrics";
import { Formatter } from "./classes/Formatter";
import path from "path";
import { RootObject } from "./types/types";

(async () => {
  try {
    const dataReader = new DataReader();

    const filePath = path.resolve(process.cwd(), "src", "data", "data.json");
    const rawData = await dataReader.readAndParseJson(filePath);

    const camelCaseData = dataReader.convertToCamelCase<RootObject>(rawData);

    const validLedger = dataReader.validateLedger(camelCaseData);

    const accountingMetrics = new AccountingMetrics(validLedger.data);

    const revenue = accountingMetrics.calculateRevenue();
    const expenses = accountingMetrics.calculateExpenses();
    const grossProfitMargin = accountingMetrics.calculateGrossProfitMargin();
    const netProfitMargin = accountingMetrics.calculateNetProfitMargin();
    const workingCapitalRatio =
      accountingMetrics.calculateWorkingCapitalRatio();

    const formatter = new Formatter();
    console.log(`Revenue: ${formatter.formatCurrency(revenue)}`);
    console.log(`Expenses: ${formatter.formatCurrency(expenses)}`);
    console.log(
      `Gross Profit Margin: ${formatter.formatPercentage(grossProfitMargin)}`,
    );
    console.log(
      `Net Profit Margin: ${formatter.formatPercentage(netProfitMargin)}`,
    );
    console.log(
      `Working Capital Ratio: ${formatter.formatPercentage(
        workingCapitalRatio,
      )}`,
    );
  } catch (err) {
    if (err instanceof Error) console.error("An error occurred:", err.message);
  }
})();
