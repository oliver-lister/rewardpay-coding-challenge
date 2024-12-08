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
      const expected = 30927.78;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 when no revenue records exist", () => {
      const emptyData: AccountData[] = mockData.filter(
        (record) => record.accountCategory !== "revenue",
      );
      accountingMetrics = new AccountingMetrics(emptyData);

      expect(accountingMetrics.calculateRevenue()).toBe(0);
    });

    it("should correctly handle records with zero revenue values", () => {
      const zeroRevenueData: AccountData[] = [
        createAccountData({ totalValue: -0 }),
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(zeroRevenueData);

      const result = accountingMetrics.calculateRevenue();
      const expected = 30927.78;

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

  describe("calculateGrossProfitMargin", () => {
    it("should correctly calculate the gross profit margin when revenue is non-zero", () => {
      const result = accountingMetrics.calculateGrossProfitMargin();
      const grossProfit = 5606.5;
      const revenue = 30927.78;
      const expectedMargin = grossProfit / revenue;

      expect(result).toBeCloseTo(expectedMargin, 2);
    });

    it("should throw an error when revenue is zero", () => {
      const zeroRevenueData = camelCaseMockGeneralLedger.data.filter(
        (record) => record.accountCategory !== "revenue",
      );
      accountingMetrics = new AccountingMetrics(zeroRevenueData);

      expect(() => {
        accountingMetrics.calculateGrossProfitMargin();
      }).toThrow(
        "Revenue cannot be zero when calculating Gross Profit Margin.",
      );
    });

    it("should handle extremely large values for gross profit and revenue", () => {
      const largeData = [
        createAccountData({
          accountCategory: "revenue",
          valueType: "debit",
          accountType: "sales",
          totalValue: Number.MAX_SAFE_INTEGER,
        }),
      ];

      accountingMetrics = new AccountingMetrics(largeData);

      const result = accountingMetrics.calculateGrossProfitMargin();
      const grossProfit = Number.MAX_SAFE_INTEGER;
      const revenue = Number.MAX_SAFE_INTEGER;
      const expectedMargin = grossProfit / revenue;

      expect(result).toBe(expectedMargin);
    });

    it("should correctly calculate gross profit margin when there are multiple revenue records", () => {
      const additionalRevenue = createAccountData({
        accountCategory: "revenue",
        valueType: "debit",
        accountType: "sales",
        totalValue: 10000,
      });

      const updatedData = [
        additionalRevenue,
        ...camelCaseMockGeneralLedger.data,
      ];

      accountingMetrics = new AccountingMetrics(updatedData);

      const result = accountingMetrics.calculateGrossProfitMargin();
      const grossProfit = 10000 + 5606.5;
      const revenue = 30927.78 + 10000;
      const expectedMargin = grossProfit / revenue;

      expect(result).toBeCloseTo(expectedMargin, 2);
    });
  });

  describe("calculateNetProfitMargin", () => {
    it("should correctly calculate the net profit margin", () => {
      const data: AccountData[] = [
        createAccountData({
          accountCategory: "revenue",
          totalValue: 10000,
          accountType: "sales",
          valueType: "credit",
        }),
        createAccountData({
          accountCategory: "expense",
          totalValue: 4000,
          accountType: "overheads",
          valueType: "debit",
        }),
      ];
      const accountingMetrics = new AccountingMetrics(data);

      const result = accountingMetrics.calculateNetProfitMargin();
      const expected = (10000 - 4000) / 10000;

      expect(result).toBeCloseTo(expected, 2);
    });

    it("should throw an error when revenue is zero", () => {
      const data: AccountData[] = [
        createAccountData({
          accountCategory: "expense",
          totalValue: 4000,
          accountType: "overheads",
          valueType: "debit",
        }),
      ];
      const accountingMetrics = new AccountingMetrics(data);

      expect(() => accountingMetrics.calculateNetProfitMargin()).toThrow(
        "Revenue cannot be zero when calculating Net Profit Margin.",
      );
    });

    it("should correctly handle zero expenses", () => {
      const data: AccountData[] = [
        createAccountData({
          accountCategory: "revenue",
          totalValue: 5000,
          accountType: "sales",
          valueType: "credit",
        }),
      ];
      const accountingMetrics = new AccountingMetrics(data);

      const result = accountingMetrics.calculateNetProfitMargin();
      const expected = 1;

      expect(result).toBe(expected);
    });

    it("should return zero when expenses equal revenue", () => {
      const data: AccountData[] = [
        createAccountData({
          accountCategory: "revenue",
          totalValue: 5000,
          accountType: "sales",
          valueType: "credit",
        }),
        createAccountData({
          accountCategory: "expense",
          totalValue: 5000,
          accountType: "overheads",
          valueType: "credit",
        }),
      ];
      const accountingMetrics = new AccountingMetrics(data);

      const result = accountingMetrics.calculateNetProfitMargin();
      const expected = 0;

      expect(result).toBe(expected);
    });

    it("should handle very large revenue and expense values", () => {
      const data: AccountData[] = [
        createAccountData({
          accountCategory: "revenue",
          totalValue: Number.MAX_SAFE_INTEGER,
          accountType: "sales",
          valueType: "credit",
        }),
        createAccountData({
          accountCategory: "expense",
          totalValue: Number.MAX_SAFE_INTEGER / 2,
          accountType: "overheads",
          valueType: "debit",
        }),
      ];
      const accountingMetrics = new AccountingMetrics(data);

      const result = accountingMetrics.calculateNetProfitMargin();
      const expected =
        (Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2) /
        Number.MAX_SAFE_INTEGER;

      expect(result).toBeCloseTo(expected, 2);
    });
  });
});
