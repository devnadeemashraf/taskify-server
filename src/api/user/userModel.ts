import mongoose from "mongoose";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { commonValidations } from "@/common/utils/commonValidation";
import { zodSchemaToMongooseSchema } from "@/common/utils/helper";
import { zodErrorMessages } from "@/common/utils/zodErrorMessages";

extendZodWithOpenApi(z);

// create zod schema
export type User = z.infer<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId | string;
};
export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  passwordHash: z.string().min(6, zodErrorMessages.PASSWORD_REQUIREMENTS_NOT_MET),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Convert zod schema to mongoose schema
export const UserSchemaMongoose = zodSchemaToMongooseSchema(UserSchema);
export const UserModel = mongoose.model("User", UserSchemaMongoose);

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
