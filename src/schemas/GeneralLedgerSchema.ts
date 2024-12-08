import z from "zod";

export const GeneralLedgerSchema = z
  .object({
    objectCategory: z.string(),
    connectionId: z.string().uuid(),
    user: z.string().uuid(),
    objectCreationDate: z.string().datetime(),
    currency: z.string(),
    objectOriginType: z.string(),
    objectOriginCategory: z.string(),
    objectType: z.string(),
    objectClass: z.string(),
    balanceDate: z.string().datetime(),
    data: z
      .array(
        z.object({
          accountCategory: z.string(),
          accountCode: z.string(),
          accountCurrency: z.string(),
          accountIdentifier: z.string().uuid(),
          accountStatus: z.string(),
          valueType: z.string(),
          accountName: z.string(),
          accountType: z.string(),
          accountTypeBank: z.string().optional(),
          systemAccount: z.string().optional(),
          totalValue: z.number(),
        }),
      )
      .nonempty(),
  })
  .strict();
