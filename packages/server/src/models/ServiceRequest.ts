import { ServiceInterface } from "./Service";
import { UserInterface } from "./User";
import { Document, Schema, Types, model } from "mongoose";

export interface ServiceRequestInterface extends Document {
  aidee: UserInterface;
  provider: UserInterface | null;
  service: ServiceInterface;
  amount: number;
  address: string;
  coordinates: number[];
  accepted: boolean;
  arrivedAt: Date | null;
  startedAt: Date | null;
  canceledAt: Date | null;
  completedAt: Date | null;
  ignoredAt: Date | null;
  feedBack: string | null;
  rating: number | null;
}

export const serviceRequestSchema: Schema = new Schema(
  {
    aidee: { type: Types.ObjectId, ref: "User" },
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
