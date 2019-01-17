import { Document, Schema, model } from "mongoose";
import { SubscriptionInterface } from "./Subscription";
import { RoleInterface } from "./Role";

export interface UserInterface extends Document {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  coordinates: number[] | null;
  password: string;
  subscription: SubscriptionInterface | null;
  subscribedAt: Date | null;
  role: RoleInterface;
  // online: boolean;
  // confirmed: boolean;
  // forgotPasswordLocked: boolean;
  // createdAt: Date;
  // updatedAt: Date;
  // trialedAt: Date;
  // cetertificates?: string[] | null;
  // avatar?: ImageModel | null;
  // services?: string[] | null; // Schema.Types.ObjectId
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    mobile: { type: String, trim: true, require: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    coordinates: [Number],
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    // online: { type: Boolean, default: false },
    // trial: { type: Boolean, default: false },
    // subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
    // confirmed: { type: Boolean, default: false },
    // forgotPasswordLocked: {
    //   type: Boolean,
    //   default: false,
    // },
    // trialedAt: Date,
    // subscribedAt: Date,
    // cetertificates: [certificateSchema],
    // avatar: imageSchema,
    // services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    // role: { type: Schema.Types.ObjectId, ref: "Role" },
  },
  { autoIndex: false }
);

userSchema.set("timestamps", true);

export const UserModel = model<UserInterface>("User", userSchema);
