import { UserInterface } from "./User";
import { ServiceInterface } from "./Service";
import { Document, Schema, model } from "mongoose";
import { certificateSchema, CertificateInterface } from "./Certificate";

export interface ProviderServiceInterface extends Document {
  description: string | null;
  user: UserInterface | null;
  service: ServiceInterface | null;
  certificates: CertificateInterface[];
  approved: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const serviceSchema: Schema = new Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    cetertificates: [certificateSchema],
    approved: { type: Boolean, default: false },
  },
  { autoIndex: false }
);

serviceSchema.set("timestamps", true);

export const ProviderServiceModel = model<ProviderServiceInterface>(
  "ProviderService",
  serviceSchema
);
