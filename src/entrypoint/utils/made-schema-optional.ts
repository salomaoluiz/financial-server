import { t } from "elysia";

export const madeSchemaOptional = (schemaObject: ReturnType<typeof t.Object>) => {
  return Object.keys(schemaObject.properties).reduce((prev, key) => {
    return Object.assign(prev, {
      [key]: t.Optional(
        schemaObject.properties[key as keyof typeof schemaObject.properties],
      ),
    });
  }, {});
};
