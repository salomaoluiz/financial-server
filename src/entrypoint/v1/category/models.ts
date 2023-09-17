import { t } from "elysia";

const CATEGORY_TYPE = {
  EXPENSE: "EXPENSE",
  INVOICE: "INVOICE",
};
export interface INewCategoryBody {
  description: string;
  type: string;
}

export const NewCategoryBody = t.Object(
  {
    description: t.String(),
    type: t.Enum(CATEGORY_TYPE, {
      error: `The type should be one of ${Object.keys(CATEGORY_TYPE).join(
        ",",
      )}`,
    }),
  },
  {
    additionalProperties: false,
  },
);

export const EditCategoryBody = t.Object(
  Object.keys(NewCategoryBody.properties).reduce((prev, key) => {
    return Object.assign(prev, {
      [key]: t.Optional(
        NewCategoryBody.properties[
          key as keyof typeof NewCategoryBody.properties
        ],
      ),
    });
  }, {}),
);

export const GetByIdParams = t.Object({ id: t.String({ pattern: "^\\d*$" }) });
