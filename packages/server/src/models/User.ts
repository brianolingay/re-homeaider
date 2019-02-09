import { Document, Schema, Types, model } from "mongoose";
import { ImageInterface, imageSchema } from "./Image";
import { CertificateInterface, certificateSchema } from "./Certificate";
import { UserSubscriptionInterface } from "./UserSubscription";
import { ServiceInterface } from "./Service";
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
  userSubscription: UserSubscriptionInterface | null;
  subscribedAt: Date | null;
  services: [ServiceInterface] | null;
  cetertificates: [CertificateInterface] | null;
  avatar: ImageInterface | null;
  role: RoleInterface;
  status: string;
  confirmed: boolean;
  forgotPasswordLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
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
    userSubscription: { type: Types.ObjectId, ref: "UserSubscription" },
    subscribedAt: Date,
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    role: { type: Types.ObjectId, ref: "Role" },
    status: { type: String, enum: ["online", "idle", "office"] },
    confirmed: { type: Boolean, default: false },
    forgotPasswordLocked: {
      type: Boolean,
      default: false,
    },
    cetertificates: [certificateSchema],
    avatar: imageSchema,
  },
  { autoIndex: false }
);

userSchema.set("timestamps", true);

export const UserModel = model<UserInterface>("User", userSchema);
