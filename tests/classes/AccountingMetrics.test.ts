import { AccountingMetrics } from "../../src/classes/AccountingMetrics";
import { AccountData } from "../../src/types/types";
import { camelCaseMockGeneralLedger } from "../__mocks__/mockGeneralLedger";

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
        {
          accountType: "",
          totalValue: -5000,
          accountCategory: "revenue",
          accountCode: "",
          accountCurrency: "",
          accountIdentifier: "",
          accountStatus: "",
          accountName: "",
          accountTypeBank: "",
          systemAccount: "",
          valueType: "",
        },
        ...mockData,
      ];
      accountingMetrics = new AccountingMetrics(negativeRevenueData);

      const result = accountingMetrics.calculateRevenue();
      const expected = -5000 + 25321.28;
      expect(result).toBeCloseTo(expected, 2);
    });

    it("should correctly handle records with zero revenue values", () => {
      const zeroRevenueData: AccountData[] = [
        {
          accountType: "revenue",
          totalValue: 0,
          accountCategory: "revenue",
          accountCode: "",
          accountCurrency: "",
          accountIdentifier: "",
          accountStatus: "",
          accountName: "",
          accountTypeBank: "",
          systemAccount: "",
          valueType: "",
        },
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
        {
          accountType: "revenue",
          totalValue: Number.MAX_SAFE_INTEGER,
          accountCategory: "revenue",
          accountCode: "",
          accountCurrency: "",
          accountIdentifier: "",
          accountStatus: "",
          accountName: "",
          accountTypeBank: "",
          systemAccount: "",
          valueType: "",
        },
        {
          accountType: "revenue",
          totalValue: Number.MIN_SAFE_INTEGER,
          accountCategory: "revenue",
          accountCode: "",
          accountCurrency: "",
          accountIdentifier: "",
          accountStatus: "",
          accountName: "",
          accountTypeBank: "",
          systemAccount: "",
          valueType: "",
        },
      ];
      accountingMetrics = new AccountingMetrics(extremeData);

      const result = accountingMetrics.calculateRevenue();
      const expected = Number.MAX_SAFE_INTEGER + Number.MIN_SAFE_INTEGER;

      expect(result).toBe(expected);
    });
  });
});
