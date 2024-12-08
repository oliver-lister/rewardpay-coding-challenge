import { AccountData } from "../../src/types/types";

export const createAccountData = (
  overrides: Partial<AccountData> = {},
): AccountData => ({
  accountType: "revenue",
  totalValue: 0,
  accountCategory: "revenue",
  accountCode: "DEFAULT_CODE",
  accountCurrency: "USD",
  accountIdentifier: "default-id",
  accountStatus: "ACTIVE",
  accountName: "Default Account",
  accountTypeBank: "",
  systemAccount: "",
  valueType: "credit",
  ...overrides,
});
