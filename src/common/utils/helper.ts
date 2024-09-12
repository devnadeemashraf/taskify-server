import mongoose from "mongoose";
import type { z } from "zod";

const zodSchemaToMongooseSchema = (zodSchema: z.ZodObject<any>): mongoose.Schema => {
  const schemaDefinition: Record<string, any> = {};

  for (const [key, value] of Object.entries(zodSchema.shape)) {
    schemaDefinition[key] = zodTypeToMongooseType(value as z.ZodType<any, any, any>);
  }

  return new mongoose.Schema(schemaDefinition, { timestamps: true });
};

const zodTypeToMongooseType = (zodType: z.ZodType<any>): any => {
  switch (zodType.constructor.name) {
    case "ZodString":
      return { type: String };
    case "ZodNumber":
      return { type: Number };
    case "ZodBoolean":
      return { type: Boolean };
    case "ZodDate":
      return { type: Date };
    case "ZodArray":
      return [zodTypeToMongooseType((zodType as z.ZodArray<any>).element)];
    case "ZodObject":
      return zodSchemaToMongooseSchema(zodType as z.ZodObject<any>);
    case "ZodEnum":
      return { type: String, enum: (zodType as z.ZodEnum<any>).options };
    case "ZodOptional":
      return {
        ...zodTypeToMongooseType((zodType as z.ZodOptional<any>).unwrap()),
        required: false,
      };
    case "ZodNullable":
      return {
        ...zodTypeToMongooseType((zodType as z.ZodNullable<any>).unwrap()),
        required: false,
      };
    case "ZodLiteral":
      return {
        type: typeof (zodType as z.ZodLiteral<any>).value,
        enum: [(zodType as z.ZodLiteral<any>).value],
      };
    case "ZodUnion":
      return { type: mongoose.Schema.Types.Mixed }; // ZodUnion can be multiple types, so we'll use Mixed here
    case "ZodIntersection":
      return { type: mongoose.Schema.Types.Mixed }; // Handle intersection types with Mixed as well
    case "ZodTuple":
      return (zodType as z.ZodTuple<any>).items.map(zodTypeToMongooseType);
    case "ZodUnknown":
    case "ZodAny":
      return { type: mongoose.Schema.Types.Mixed }; // Fallback for unknown or any types
    default:
      throw new Error(`Unsupported Zod type: ${zodType.constructor.name}`);
  }
};

export { zodSchemaToMongooseSchema };
