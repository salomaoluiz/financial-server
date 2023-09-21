import { t } from "elysia";
import { madeSchemaOptional } from "@entrypoint/utils/made-schema-optional";
import { CategoryType } from "@prisma/client";

const CATEGORY_TYPE = {
  EXPENSE: "EXPENSE",
  INCOME: "INCOME",
};

export interface INewCategoryBody {
  description: string;
  type: CategoryType;
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

export const EditCategoryBody = t.Object(madeSchemaOptional(NewCategoryBody));

export interface IFilterCategoryParams {
  type?: CategoryType;
}
export const FilterCategoryParams = t.Object({
  type: t.Optional(NewCategoryBody.properties.type),
});

export const GetByIdParams = t.Object({
  id: t.String(),
});
