import { Document, Schema, model } from "mongoose";
import { ServiceInterface } from "./Service";

export interface CateogryInterface extends Document {
  name: string;
  description: string | null;
  services: ServiceInterface[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  },
  { autoIndex: false }
);

categorySchema.set("timestamps", true);

export const CategoryModel = model<CateogryInterface>(
  "Category",
  categorySchema
);
