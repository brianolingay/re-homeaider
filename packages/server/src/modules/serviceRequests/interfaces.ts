import { ObjectId } from "mongodb";
import { ServiceRequest } from "./../../types/objects/ServiceRequest";

export interface ServiceRequestProgressPayload {
  serviceRequestId: ObjectId;
  serviceRequest: ServiceRequest;
}
