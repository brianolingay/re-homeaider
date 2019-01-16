import { Document, Schema, model } from "mongoose";

export interface RoleInterface extends Document {
  name: string;
  description: string | null;
}

const roleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { autoIndex: false }
);

roleSchema.set("timestamps", true);

export const RoleModel = model<RoleInterface>("Role", roleSchema);
