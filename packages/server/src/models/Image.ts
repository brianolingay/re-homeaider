import { Document, Schema } from "mongoose";

export interface ImageInterface extends Document {
  filename: string | null;
  filepath: string | null;
}

export const imageSchema: Schema = new Schema({
  filename: {
    type: String,
    trim: true,
  },
  filepath: {
    type: String,
    trim: true,
  },
});
