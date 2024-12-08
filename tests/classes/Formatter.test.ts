import { Formatter } from "../../src/classes/Formatter";

describe("Formatter class", () => {
  const formatter = new Formatter();

  describe("formatCurrency", () => {
    it("should format a positive integer correctly", () => {
      expect(formatter.formatCurrency(1234)).toBe("$1,234");
    });

    it("should round and format a positive float correctly", () => {
      expect(formatter.formatCurrency(1234.56)).toBe("$1,235");
      expect(formatter.formatCurrency(1234.49)).toBe("$1,234");
    });

    it("should handle large numbers with commas", () => {
      expect(formatter.formatCurrency(123456789)).toBe("$123,456,789");
      expect(formatter.formatCurrency(1000000)).toBe("$1,000,000");
    });

    it("should handle very large numbers", () => {
      expect(formatter.formatCurrency(1000000000000)).toBe(
        "$1,000,000,000,000",
      );
    });

    it("should handle small numbers", () => {
      expect(formatter.formatCurrency(1)).toBe("$1");
      expect(formatter.formatCurrency(2)).toBe("$2");
    });

    it("should handle negative values correctly", () => {
      expect(formatter.formatCurrency(-1234.56)).toBe("-$1,235");
      expect(formatter.formatCurrency(-1234.49)).toBe("-$1,234");
    });

    it("should handle zero correctly", () => {
      expect(formatter.formatCurrency(0)).toBe("$0");
    });

    it("should handle very small fractions", () => {
      expect(formatter.formatCurrency(0.4)).toBe("$0");
      expect(formatter.formatCurrency(0.5)).toBe("$1");
    });
  });

  describe("formatPercentage", () => {
    it("should format a small decimal value correctly", () => {
      expect(formatter.formatPercentage(0.1234)).toBe("12.3%");
      expect(formatter.formatPercentage(0.1)).toBe("10.0%");
    });

    it("should format a large decimal value correctly", () => {
      expect(formatter.formatPercentage(1.23)).toBe("123.0%");
      expect(formatter.formatPercentage(1.4567)).toBe("145.7%");
    });

    it("should handle whole numbers correctly", () => {
      expect(formatter.formatPercentage(0)).toBe("0.0%");
      expect(formatter.formatPercentage(1)).toBe("100.0%");
    });

    it("should handle negative values correctly", () => {
      expect(formatter.formatPercentage(-0.5)).toBe("-50.0%");
      expect(formatter.formatPercentage(-2.34)).toBe("-234.0%");
    });

    it("should handle very small fractions", () => {
      expect(formatter.formatPercentage(0.0001)).toBe("0.0%");
      expect(formatter.formatPercentage(0.0005)).toBe("0.1%");
    });

    it("should handle very large values", () => {
      expect(formatter.formatPercentage(12345)).toBe("1234500.0%");
    });

    it("should handle numbers with high precision", () => {
      expect(formatter.formatPercentage(0.123456789)).toBe("12.3%");
      expect(formatter.formatPercentage(1.987654321)).toBe("198.8%");
    });
  });
});
