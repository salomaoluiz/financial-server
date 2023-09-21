import { t } from "elysia";
import { madeSchemaOptional } from "@entrypoint/utils/made-schema-optional.ts";

export interface INewTagBody {
  name: string;
}

export const NewTagBody = t.Object(
  {
    name: t.String(),
  },
  {
    additionalProperties: false,
  },
);

export const EditTagBody = t.Object(madeSchemaOptional(NewTagBody));

export interface IFilterTagParams {
  name?: string;
}
export const FilterTagParams = t.Object({
  name: t.Optional(NewTagBody.properties.name),
});

export const GetByIdParams = t.Object({
  id: t.String(),
});
