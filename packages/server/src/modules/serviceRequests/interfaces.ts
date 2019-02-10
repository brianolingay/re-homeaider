import { ObjectId } from "mongodb";
import { ServiceRequest } from "./../../types/objects/ServiceRequest";

export interface ServiceRequestProgressPayload {
  serviceRequestId: ObjectId;
  serviceRequest: ServiceRequest;
}

export interface NewBookingServiceRequestPayload {
  serviceRequest: ServiceRequest;
}

export interface NewHiringServiceRequestPayload {
  providerId: ObjectId;
  serviceRequest: ServiceRequest;
}
