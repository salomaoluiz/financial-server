import { t } from "elysia";

const jsRegexDatePattern =
  "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}Z$";

export interface INewTransactionBody {
  description: string;
  value: number;
  date: string;
  // categoryId: number;
}

export const NewTransactionBody = t.Object(
  {
    description: t.String(),
    value: t.Number(),
    date: t.String({
      format: "date",
      pattern: jsRegexDatePattern,
      default: new Date().toISOString(),
      error: `The date is not a valid date, try something like: ${new Date().toISOString()}`,
    }),
    // categoryId: t.Number(),
  },
  {
    additionalProperties: false,
  },
);

export const GetByIdParams = t.Object({ id: t.String({ pattern: "^\\d*$" }) });
