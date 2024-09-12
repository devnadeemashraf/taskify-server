import mongoose from "mongoose";
import { z } from "zod";

// MongoDB Object ID Validation
const objectIdValidation = z
  .string()
  .refine((data) => mongoose.isValidObjectId(data), "Invalid id [ObjectID expected]");

// Common Validations for Inputs
export const commonValidations = {
  id: objectIdValidation,
  // ... other common validations
};
