import { Document, Schema, model } from "mongoose";
import { PaymentMode } from "../types/paymentModeEnum";

export interface SubscriptionInterface extends Document {
  name: string;
  description: string | null;
  amount: number;
  benefits: string[] | null;
  paymentMode: PaymentMode;
}

export const subscriptionSchema: Schema = new Schema(
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
    amount: { type: Number, default: 0.0 },
    benefits: [String],
    paymentMode: {
      type: String,
      enum: ["free", "monthly", "yearly", "forever"],
    },
  },
  { autoIndex: false }
);

export const SubscriptionModel = model<SubscriptionInterface>(
  "Subscription",
  subscriptionSchema
);
