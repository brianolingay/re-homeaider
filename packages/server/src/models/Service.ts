import { Document, Schema, model } from "mongoose";
import { CateogryInterface } from "./Category";
import { ServiceActionInterface } from "./ServiceAction";

export interface ServiceInterface extends Document {
  name: string;
  description: string | null;
  statement: string;
  category: CateogryInterface | null;
  serviceActions: ServiceActionInterface[] | null;
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
    statement: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    serviceActions: [{ type: Schema.Types.ObjectId, ref: "ServiceAction" }],
  },
  { autoIndex: false }
);

serviceSchema.set("timestamps", true);

export const ServiceModel = model<ServiceInterface>("Service", serviceSchema);
