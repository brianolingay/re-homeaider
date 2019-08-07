import { Document, Schema, model } from "mongoose";
import { ServiceInterface } from "./Service";

export interface CateogryInterface extends Document {
  name: string;
  description: string | null;
  service: ServiceInterface;
  statement: string;
  details: JSON;
  createdAt: Date | null;
  updatedAt: Date | null;
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
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    statement: {
      type: String,
      required: true,
      trim: true,
    },
    details: [Schema.Types.Mixed],
  },
  { autoIndex: false }
);

categorySchema.set("timestamps", true);

export const CategoryModel = model<CateogryInterface>(
  "Category",
  categorySchema
);
