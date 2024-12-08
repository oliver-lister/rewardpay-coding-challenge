export class Formatter {
  /**
   * Formats a number as a currency string.
   * Example: -1234 -> "-$1,234"
   *
   * @param {number} value - The number to format.
   * @returns {string} - The formatted currency string.
   */
  formatCurrency(value: number): string {
    const absoluteValue = Math.abs(value);
    const formattedValue = `$${Math.round(absoluteValue).toLocaleString()}`;
    return value < 0 ? `-${formattedValue}` : formattedValue;
  }

  /**
   * Formats a number as a percentage string with one decimal place.
   * Example: -1.2345 -> "-123.5%"
   *
   * @param {number} value - The number to format.
   * @returns {string} - The formatted percentage string.
   * @note JavaScript's native `Math.round` may introduce floating-point
   * rounding issues in edge cases. For improved precision, consider using
   * a library like Big.js to handle calculations with greater accuracy.
   */
  formatPercentage(value: number): string {
    const percentage = value * 100;
    const rounded = Math.round((percentage + Number.EPSILON) * 10) / 10;
    return `${rounded.toFixed(1)}%`;
  }
}
