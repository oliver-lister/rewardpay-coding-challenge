import { AccountingMetrics } from "../../src/classes/AccountingMetrics";
import { AccountData } from "../../src/types/types";
import { camelCaseMockGeneralLedger } from "../__mocks__/mockGeneralLedger";
import { createAccountData } from "../utils/createAccountData";

const mockData: AccountData[] = camelCaseMockGeneralLedger.data;

describe("AccountingMetrics class", () => {
  let accountingMetrics: AccountingMetrics;

  beforeEach(() => {
    accountingMetrics = new AccountingMetrics(mockData);
  });

  describe("calculateRevenue", () => {
    it("should correctly calculate total revenue from the data", () => {
      const result = accountingMetrics.calculateRevenue();
      const expected = 25321.28;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 when no revenue records exist", () => {
      const emptyData: AccountData[] = mockData.filter(
        (record) => record.accountCategory !== "revenue",
      );
      accountingMetrics = new AccountingMetrics(emptyData);

      expect(accountingMetrics.calculateRevenue()).toBe(0);
    });

    it("should handle negative revenue values correctly", () => {
      const negativeRevenueData: AccountData[] = [
        createAccountData({ totalValue: -5000 }),
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(negativeRevenueData);

      const result = accountingMetrics.calculateRevenue();
      const expected = -5000 + 25321.28;
      expect(result).toBeCloseTo(expected, 2);
    });

    it("should correctly handle records with zero revenue values", () => {
      const zeroRevenueData: AccountData[] = [
        createAccountData({ totalValue: -0 }),
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(zeroRevenueData);

      const result = accountingMetrics.calculateRevenue();
      const expected = 25321.28;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 for an empty data array", () => {
      accountingMetrics = new AccountingMetrics([]);
      expect(accountingMetrics.calculateRevenue()).toBe(0);
    });

    it("should handle extremely large and small revenue values", () => {
      const extremeData: AccountData[] = [
        createAccountData({ totalValue: Number.MAX_SAFE_INTEGER }),
        createAccountData({ totalValue: Number.MIN_SAFE_INTEGER }),
      ];
      accountingMetrics = new AccountingMetrics(extremeData);

      const result = accountingMetrics.calculateRevenue();
      const expected = Number.MAX_SAFE_INTEGER + Number.MIN_SAFE_INTEGER;

      expect(result).toBe(expected);
    });
  });

  describe("calculateExpenses", () => {
    it("should correctly calculate total expenses from the data", () => {
      const result = accountingMetrics.calculateExpenses();

      const expected = 1289.58 + 620.5 + 35.9 + 102.5;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 when no expense records exist", () => {
      const noExpensesData: AccountData[] = mockData.filter(
        (record) => record.accountCategory !== "expense",
      );
      accountingMetrics = new AccountingMetrics(noExpensesData);

      expect(accountingMetrics.calculateExpenses()).toBe(0);
    });

    it("should handle negative expense values correctly", () => {
      const negativeExpensesData: AccountData[] = [
        createAccountData({
          accountCategory: "expense",
          totalValue: -1000,
        }),
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(negativeExpensesData);

      const result = accountingMetrics.calculateExpenses();

      const expected = -1000 + 1289.58 + 620.5 + 35.9 + 102.5;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should correctly handle records with zero expense values", () => {
      const zeroExpensesData: AccountData[] = [
        createAccountData({
          accountCategory: "expense",
          totalValue: 0,
        }),
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(zeroExpensesData);

      const result = accountingMetrics.calculateExpenses();

      const expected = 1289.58 + 620.5 + 35.9 + 102.5;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 for an empty data array", () => {
      accountingMetrics = new AccountingMetrics([]);

      const expected = 0;

      expect(accountingMetrics.calculateExpenses()).toBe(expected);
    });

    it("should handle extremely large and small expense values", () => {
      const extremeExpensesData: AccountData[] = [
        createAccountData({
          accountCategory: "expense",
          totalValue: Number.MAX_SAFE_INTEGER,
        }),
        createAccountData({
          accountCategory: "expense",
          totalValue: Number.MIN_SAFE_INTEGER,
        }),
      ];
      accountingMetrics = new AccountingMetrics(extremeExpensesData);

      const result = accountingMetrics.calculateExpenses();

      const expected = Number.MAX_SAFE_INTEGER + Number.MIN_SAFE_INTEGER;

      expect(result).toBe(expected);
    });
  });
});
