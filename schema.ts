import type { Schema, SchemaEntry } from "./types.ts";

export function toSampleData(schema: Schema): Record<string, unknown> {
  return Object.entries(schema).reduce(
    (acc: Record<string, unknown>, cur: [string, SchemaEntry]) => {
      const [key, entry] = cur;
      switch (entry.type) {
        case "string":
          return {
            ...acc,
            [key]: "lorem ipsum",
          };
        case "number":
          return {
            ...acc,
            [key]: Math.floor(Math.random() * 10),
          };
        case "object":
          return {
            ...acc,
            [key]: toSampleData(entry.properties),
          };
        case "enum":
          return {
            ...acc,
            [key]:
              entry.enum[Math.floor(Math.random() * entry.enum.length - 1)],
          };
        case "array":
          return {
            ...acc,
            [key]: [_entryToSampleData(entry.items)],
          };
        default:
          return acc;
      }
    },
    {}
  );
}

function _entryToSampleData(entry: SchemaEntry): unknown {
  switch (entry.type) {
    case "string":
      return "lorem ipsum";
    case "number":
      return Math.floor(Math.random() * 10);
    case "object":
      return toSampleData(entry.properties);
    case "enum":
      return entry.enum[Math.floor(Math.random() * entry.enum.length - 1)];
    case "array":
      return _entryToSampleData(entry.items);
  }
}
