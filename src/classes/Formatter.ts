export class Formatter {
  formatCurrency(value: number): string {
    return `$${Math.round(value).toLocaleString()}`;
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}
