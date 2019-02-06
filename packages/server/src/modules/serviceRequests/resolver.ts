import { ServiceRequestModel } from "./../../models/ServiceRequest";
import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { ServiceRequest } from "../../types/objects/ServiceRequest";
import { ServiceRequestInput } from "./input";
import { ServiceRequestResponse } from "./response";

@Resolver(ServiceRequest)
export class ServiceRequestResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => ServiceRequestResponse, { nullable: true })
  async createServiceRequest(
    @Arg("serviceSeekerId") serviceSeekerId: ObjectId,
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("providerId") providerId: ObjectId | null,
    @Arg("input") serviceRequestInput: ServiceRequestInput
  ): Promise<ServiceRequestResponse> {
    let query = {
      ...serviceRequestInput,
      serviceSeeker: serviceSeekerId,
      service: serviceId,
    };

    if (providerId) {
      query = { provider: providerId, ...query };
    }

    try {
      await ServiceRequestModel.create(query);
    } catch (err) {
      return {
        errors: [
          {
            path: "create",
            message: "Something went wrong while booking a service",
          },
        ],
      };
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => ServiceRequestResponse, { nullable: true })
  async updateServiceRequest(
    @Arg("serviceRequestId") serviceRequestId: ObjectId,
    @Arg("input") serviceRequestInput: ServiceRequestInput
  ): Promise<ServiceRequestResponse> {
    try {
      await ServiceRequestModel.updateOne(
        { _id: serviceRequestId },
        { ...serviceRequestInput }
      );
    } catch (err) {
      return {
        errors: [
          {
            path: "update",
            message: "Something went wrong with the service request",
          },
        ],
      };
    }

    return { errors: [] };
  }
}
