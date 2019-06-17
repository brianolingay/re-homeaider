import { Document, Schema, model } from "mongoose";
import { CateogryInterface } from "./Category";

export interface ServiceInterface extends Document {
  name: string;
  description: string | null;
  category: CateogryInterface | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const serviceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { autoIndex: false }
);

serviceSchema.set("timestamps", true);

export const ServiceModel = model<ServiceInterface>("Service", serviceSchema);
