import { randomUUID } from "crypto";

export const mockGeneralLedger = {
  object_category: "general-ledger",
  connection_id: randomUUID(),
  user: randomUUID(),
  object_creation_date: new Date().toISOString(),
  data: [
    {
      account_category: "revenue",
      account_code: "200",
      account_currency: "AUD",
      account_identifier: randomUUID(),
      account_status: "ACTIVE",
      value_type: "credit",
      account_name: "Sales",
      account_type: "sales",
      account_type_bank: "",
      system_account: "",
      total_value: 25321.28,
    },
    {
      account_code: "400",
      account_currency: "AUD",
      account_identifier: randomUUID(),
      account_name: "Advertising",
      account_status: "ACTIVE",
      system_account: "",
      value_type: "debit",
      account_category: "expense",
      account_type_bank: "",
      total_value: 1289.58,
      account_type: "overheads",
    },
  ],
};
