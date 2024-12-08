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
});
