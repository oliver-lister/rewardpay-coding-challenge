export interface AccountData {
  accountCategory: string;
  accountCode: string;
  accountCurrency: string;
  accountIdentifier: string;
  accountStatus: string;
  accountName: string;
  accountType?: string;
  accountTypeBank?: string;
  systemAccount: string;
  valueType: string;
  totalValue: number;
}

export interface RootObject {
  objectCategory: string;
  connectionId: string;
  user: string;
  objectCreationDate: string;
  data: AccountData[];
  currency: string;
  objectOriginType: string;
  objectOriginCategory: string;
  objectType: string;
  objectClass: string;
  balanceDate: string;
}
