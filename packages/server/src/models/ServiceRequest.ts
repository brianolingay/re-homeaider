import { ServiceInterface } from "./Service";
import { UserInterface } from "./User";
import { Document, Schema, Types, model } from "mongoose";

export interface ServiceRequestInterface extends Document {
  serviceSeeker: UserInterface;
  provider: UserInterface | null;
  service: ServiceInterface;
  amount: number;
  address: string;
  coordinates: number[];
  accepted: boolean;
  arrivedAt: string | null;
  startedAt: string | null;
  canceledAt: string | null;
  completedAt: string | null;
  ignoredAt: string | null;
  feedBack: string | null;
  rating: number;
}

export const serviceRequestSchema: Schema = new Schema(
  {
    serviceSeeker: { type: Types.ObjectId, ref: "User" },
    provider: { type: Types.ObjectId, ref: "User", default: null },
    service: { type: Types.ObjectId, ref: "Service" },
    amount: { type: Number, default: 0.0 },
    address: String,
    coordinates: [Number],
    accepted: { type: Boolean, default: false },
    arrivedAt: { type: Date, default: null },
    startedAt: { type: Date, default: null },
    canceledAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    ignoredAt: { type: Date, default: null },
    feedBack: { type: String, trim: true, default: null },
    rating: { type: Number, max: 5, default: 0 },
  },
  { autoIndex: false }
);

export const ServiceRequestModel = model<ServiceRequestInterface>(
  "ServiceRequest",
  serviceRequestSchema
);
