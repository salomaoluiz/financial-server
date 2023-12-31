import { t } from "elysia";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import { madeSchemaOptional } from "@entrypoint/utils/made-schema-optional.ts";

const jsRegexMonthPattern =
  "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))";
const jsRegexHourPattern =
  "(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}Z$";

const jsRegexDatePattern = `${jsRegexMonthPattern}T${jsRegexHourPattern}`;

interface BaseTransaction {
  description: string;
  categoryId: string;
  value: number;
  tags?: string[];
}

export interface INewTransactionBody extends BaseTransaction {
  date: string;
  partnerName: string;
}

export interface INewSubTransactionBody extends BaseTransaction {
  date: string;
  partnerName: string;
  subTransaction: Array<BaseTransaction & { id?: string }>;
}

const BaseTransactionBody = t.Object({
  description: t.String(),
  categoryId: t.String({ default: "65074dfff07e0c6b1ba1a2ec" }),
  tags: t.Optional(t.Array(t.String({ default: "650cd6224356ff173b373f86" }))),
});

export const NewTransactionBody = t.Object(
  {
    ...BaseTransactionBody.properties,
    value: t.Number({ exclusiveMinimum: 0 }),
    partnerName: t.Optional(t.String({ default: "Mercado da Esquina" })),
    date: t.String({
      format: "date",
      pattern: jsRegexDatePattern,
      default: new Date().toISOString(),
      error: `The date is not a valid date, try something like: ${new Date().toISOString()}`,
    }),
  },
  {
    additionalProperties: false,
  },
);

export const NewSubTransactionBody = t.Object({
  ...BaseTransactionBody.properties,
  partnerName: t.Optional(t.String({ default: "Mercado da Esquina" })),
  date: t.String({
    format: "date",
    pattern: jsRegexDatePattern,
    default: new Date().toISOString(),
    error: `The date is not a valid date, try something like: ${new Date().toISOString()}`,
  }),
  subTransaction: t.Array(
    t.Object({
      ...BaseTransactionBody.properties,
      value: t.Number({ exclusiveMinimum: 0 }),
    }),
  ),
});

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
  categoryId: t.Optional(t.String()),
});

export const EditTransactionBody = t.Object(
  madeSchemaOptional(NewTransactionBody),
);
export const EditSubTransactionBody = t.Object(
  madeSchemaOptional(NewSubTransactionBody),
);
export const GetByIdParams = t.Object({
  transactionId: t.String(),
});
