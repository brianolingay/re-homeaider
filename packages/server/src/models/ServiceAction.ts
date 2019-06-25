import { Document, Schema, model } from "mongoose";
import { ServiceInterface } from "./Service";

export interface ServiceActionInterface extends Document {
  name: string;
  description: string | null;
  service: ServiceInterface | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const serviceActionSchema: Schema = new Schema(
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
    service: { type: Schema.Types.ObjectId, ref: "Service" },
  },
  { autoIndex: false }
);

serviceActionSchema.set("timestamps", true);

export const ServiceActionModel = model<ServiceActionInterface>(
  "ServiceAction",
  serviceActionSchema
);
