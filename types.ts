export type Schema = {
  [name: string]: SchemaEntry;
};

export type SchemaEntry =
  | {
      type: "string" | "number";
    }
  | {
      type: "enum";
      enum: string[];
    }
  | {
      type: "object";
      properties: Schema;
    }
  | {
      type: "array";
      items: SchemaEntry;
    };
