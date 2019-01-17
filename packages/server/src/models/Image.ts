import { Document, Schema } from "mongoose";

export interface ImageInterface extends Document {
  filename: string;
  filePath: string;
}

export const imageSchema: Schema = new Schema({
  filename: {
    type: String,
    trim: true,
  },
  filePath: {
    type: String,
    trim: true,
  },
});
