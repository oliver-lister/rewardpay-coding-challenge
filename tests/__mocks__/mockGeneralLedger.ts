export const mockGeneralLedger = {
  object_category: "general-ledger",
  connection_id: "2d5bb9be-a096-4fb3-9c97-83e1c64f839e",
  user: "2d5bb9be-b096-4fa3-9c97-83e1c64f839e",
  object_creation_date: "2024-12-08T03:52:40.439Z",
  data: [
    {
      account_category: "revenue",
      account_code: "200",
      account_currency: "AUD",
      account_identifier: "2d5bb9be-a096-4fa6-9c97-83e1c64f839e",
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
      account_identifier: "2d5bb9be-a096-4fa3-9c97-83e1d64f839e",
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

export const camelCaseMockGeneralLedger = {
  objectCategory: "general-ledger",
  connectionId: "2d5bb9be-a096-4fb3-9c97-83e1c64f839e",
  user: "2d5bb9be-b096-4fa3-9c97-83e1c64f839e",
  objectCreationDate: "2024-12-08T03:52:40.439Z",
  data: [
    {
      accountCategory: "revenue",
      accountCode: "200",
      accountCurrency: "AUD",
      accountIdentifier: "2d5bb9be-a096-4fa6-9c97-83e1c64f839e",
      accountStatus: "ACTIVE",
      valueType: "credit",
      accountName: "Sales",
      accountType: "sales",
      accountTypeBank: "",
      systemAccount: "",
      totalValue: 25321.28,
    },
    {
      accountCode: "400",
      accountCurrency: "AUD",
      accountIdentifier: "2d5bb9be-a096-4fa3-9c97-83e1d64f839e",
      accountName: "Advertising",
      accountStatus: "ACTIVE",
      systemAccount: "",
      valueType: "debit",
      accountCategory: "expense",
      accountTypeBank: "",
      totalValue: 1289.58,
      accountType: "overheads",
    },
  ],
};
