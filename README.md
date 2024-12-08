# RewardPay Coding Challenge

## Overview

This repository contains my solution to the RewardPay coding challenge.

The application processes an external data file (`data.json`), computes key accounting metrics, and outputs them to the console with proper formatting.

## Features

- Reads the provided `data.json` file asynchronously to ensure non-blocking operations.
- Parses and validates the JSON structure using the **Zod** library for robust type checking.
- Converts object keys to **camelCase** to ensure alignment with TypeScript best practices, enabling consistent naming conventions across the codebase.
- Implements a class-based architecture to calculate the following accounting metrics:
  - **Revenue**: Total value of revenue accounts.
  - **Expenses**: Total value of expense accounts.
  - **Gross Profit Margin**: Percentage of revenue derived from sales.
  - **Net Profit Margin**: Percentage of profit after deducting expenses from revenue.
  - **Working Capital Ratio**: Ratio of assets to liabilities, expressed as a percentage.
- Formats the output in clear currency or percentage styles for readability.
- Includes a CI workflow with automated testing triggered on push, utilising Docker.

## Getting Started

### Prerequisites

To run this application, ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm**: v8 or higher (comes bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oliver-lister/rewardpay-coding-challenge.git
   cd rewardpay-coding-challenge
   git checkout feature/accounting-metrics
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Build and Run the Application

#### Using NPM

Run the following commands to build and start the application:

```bash
npm run build
npm run start
```

The output should look like this:

```plaintext
> rewardpay-coding-challenge@1.0.0 start
> node ./dist/src/index.js

Revenue: $32,431
Expenses: $36,530
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%
```

#### _Optional:_ Docker Image

If you wish to build and run the application as a docker container, simply run the following commands:

```bash
docker build -t rewardpay-coding-challenge .
docker run rewardpay-coding-challenge
```

### Tests

To run the `Jest` unit tests:

```bash
npm test
```

## Calculations

1. **Revenue**  
   Sum all `total_value` fields where `account_category` is `"revenue"`.

2. **Expenses**  
   Sum all `total_value` fields where `account_category` is `"expense"`.

3. **Gross Profit Margin**

   - Sum `total_value` fields where `account_type` is `"sales"` and `value_type` is `"debit"`.
   - Divide this by the revenue value and multiply by 100 to get a percentage.

4. **Net Profit Margin**

   - Subtract expenses from revenue.
   - Divide the result by revenue and multiply by 100 to get a percentage.

5. **Working Capital Ratio**  
   **Assets:**

   - Add `total_value` where:
     - `account_category` is `"assets"`.
     - `value_type` is `"debit"`.
     - `account_type` is `"current"`, `"bank"`, or `"current_accounts_receivable"`.
   - Subtract `total_value` where:
     - `account_category` is `"assets"`.
     - `value_type` is `"credit"`.
     - `account_type` is `"current"`, `"bank"`, or `"current_accounts_receivable"`.

   **Liabilities:**

   - Add `total_value` where:
     - `account_category` is `"liability"`.
     - `value_type` is `"credit"`.
     - `account_type` is `"current"` or `"current_accounts_payable"`.
   - Subtract `total_value` where:
     - `account_category` is `"liability"`.
     - `value_type` is `"debit"`.
     - `account_type` is `"current"` or `"current_accounts_payable"`.

   **Formula:**

   - Divide assets by liabilities and multiply by 100 to get a percentage.

---

### Formatting

#### **Currency Figures:**

- Prefixed with `$`.
- Use commas to separate thousands.
- Remove cents by rounding to the nearest whole number (e.g., `$32,431`).
- Note: The rounding approach used in this application is standard rounding, where numbers with decimal values of `.5` or higher are rounded up. For increased precision, especially in financial calculations, you could implement **bankers' rounding** using libraries like `big.js`.

#### **Percentage Values:**

- Displayed with one decimal point for clarity (e.g., `118.8%`).
- Rounded to the nearest tenth using standard rounding.
- Note: Similarly, for more precise percentage calculations, **bankers' rounding** with a library like `big.js` could be applied to ensure consistent results, especially for edge cases in large datasets.

[Bankers' Rounding Documentation](https://docs.alipayplus.com/alipayplus/alipayplus/reconcile_mpp/bank_rounding?role=MPP&product=Payment1&version=1.5.5)

---

### Dependencies

- **Node.js**
- **Jest** (for unit testing)
- **Zod** (for data validation)
