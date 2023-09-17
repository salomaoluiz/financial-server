import { t } from "elysia";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";

const jsRegexMonthPattern =
  "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))";
const jsRegexHourPattern =
  "(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}Z$";

const jsRegexDatePattern = `${jsRegexMonthPattern}T${jsRegexHourPattern}`;

export interface INewTransactionBody {
  description: string;
  value: number;
  date: string;
  categoryId: number;
}

export const NewTransactionBody = t.Object(
  {
    description: t.String(),
    value: t.Number({ exclusiveMinimum: 0 }),
    date: t.String({
      format: "date",
      pattern: jsRegexDatePattern,
      default: new Date().toISOString(),
      error: `The date is not a valid date, try something like: ${new Date().toISOString()}`,
    }),
    categoryId: t.Number({ multipleOf: 1, minimum: 1 }),
  },
  {
    additionalProperties: false,
  },
);

export interface IFilterTransactionParams {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}

export const FilterTransactionParams = t.Object({
  startDate: t.Optional(
    t.String({
      ...NewTransactionBody.properties.date,
      default: startOfMonth(Date.now()).toISOString(),
    }),
  ),
  endDate: t.Optional(
    t.String({
      ...NewTransactionBody.properties.date,
      default: endOfMonth(Date.now()).toISOString(),
    }),
  ),
  categoryId: t.Optional(t.String({ pattern: "^\\d*$" })),
});
export const GetByIdParams = t.Object({ id: t.String({ pattern: "^\\d*$" }) });
