import { Document, Schema } from "mongoose";
import { imageSchema, ImageInterface } from "./Image";

export interface CertificateInterface extends Document {
  name: string;
  description: string | null;
  certified_at: Date;
  images: ImageInterface;
}

export const certificateSchema: Schema = new Schema({
  name: {
    type: String,
    maxlength: 60,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  certified_at: Date,
  images: imageSchema,
});
