export class Formatter {
  formatCurrency(value: number): string {
    const absoluteValue = Math.abs(value);
    const formattedValue = `$${Math.round(absoluteValue).toLocaleString()}`;
    return value < 0 ? `-${formattedValue}` : formattedValue;
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}
