import {
  ServiceRequestProgressPayload,
  NewBookingServiceRequestPayload,
  NewHiringServiceRequestPayload,
} from "./interfaces";
import { MyContext } from "./../../types/Context";
import { ServiceRequestModel } from "./../../models/ServiceRequest";
import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
  Ctx,
  Subscription,
  ResolverFilterData,
  Root,
  Args,
  PubSub,
  Publisher,
  PubSubEngine,
} from "type-graphql";
import { ObjectId } from "mongodb";
import { ServiceRequest } from "../../types/objects/ServiceRequest";
import { ServiceRequestInput } from "./input";
import { ServiceRequestResponse } from "./response";
import {
  ServiceRequestProgressArgs,
  NewBookingServiceRequestArgs,
  NewHiringServiceRequestArgs,
} from "./args";
import { Topics } from "./topics";

@Resolver(ServiceRequest)
export class ServiceRequestResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => ServiceRequestResponse, { nullable: true })
  async createServiceRequest(
    @Arg("input") serviceRequestInput: ServiceRequestInput,
    @Ctx() ctx: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<ServiceRequestResponse> {
    if (!ctx.user) {
      return {
        serviceRequestId: null,
        errors: [
          {
            path: "create",
            message: "Something went wrong while booking a service",
          },
        ],
      };
    }

    const serviceRequest = new ServiceRequestModel({
      ...serviceRequestInput,
      serviceSeeker: ctx.user._id,
    });

    try {
      await serviceRequest.save();

      const newServiceRequest = serviceRequest
        .populate("serviceSeeker")
        .populate("provider")
        .populate({
          path: "service",
          populate: { path: "category" },
        });

      if (newServiceRequest) {
        if (serviceRequestInput.provider) {
          const payload: NewHiringServiceRequestPayload = {
            providerId: serviceRequestInput.provider,
            serviceRequest: newServiceRequest,
          };
          await pubSub.publish(Topics.NewHiringServiceRequest, payload);
        } else {
          const payload: NewBookingServiceRequestPayload = {
            serviceRequest: newServiceRequest,
          };
          await pubSub.publish(Topics.NewBookingServiceRequest, payload);
        }

        const payload: ServiceRequestProgressPayload = {
          serviceRequestId: newServiceRequest._id,
          serviceRequest: newServiceRequest,
        };
        await pubSub.publish(Topics.ServiceRequestProgress, payload);
      }

      return { serviceRequestId: newServiceRequest._id, errors: [] };
    } catch (err) {
      console.log(err);
      return {
        serviceRequestId: null,
        errors: [
          {
            path: "create",
            message: "Something went wrong while booking a service",
          },
        ],
      };
    }
  }

  @Authorized()
  @Mutation(() => ServiceRequestResponse, { nullable: true })
  async updateServiceRequest(
    @Arg("serviceRequestId") serviceRequestId: ObjectId,
    @Arg("input") serviceRequestInput: ServiceRequestInput,
    @PubSub(Topics.ServiceRequestProgress)
    publish: Publisher<ServiceRequestProgressPayload>
  ): Promise<ServiceRequestResponse> {
    try {
      await ServiceRequestModel.updateOne(
        { _id: serviceRequestId },
        { ...serviceRequestInput }
      );
    } catch (err) {
      return {
        serviceRequestId,
        errors: [
          {
            path: "update",
            message: "Something went wrong with the service request",
          },
        ],
      };
    }

    const serviceRequest = await ServiceRequestModel.findOne({
      _id: serviceRequestId,
    })
      .populate("serviceSeeker")
      .populate("provider")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .lean()
      .exec();

    if (serviceRequest) {
      await publish({ serviceRequestId, serviceRequest });
    }

    return { serviceRequestId, errors: [] };
  }

  @Authorized()
  @Query(() => [ServiceRequest], { nullable: true })
  async availableBookingRequest(
    @Ctx() ctx: MyContext
  ): Promise<ServiceRequest[]> {
    if (!ctx.user) {
      return [];
    }
    const services = ctx.user.services.map(item => item._id);
    console.log(services);
    const serviceRequests = await ServiceRequestModel.find({
      service: { $in: services },
      provider: null,
      canceledAt: null,
      accepted: false,
      startedAt: null,
      ignoredAt: null,
      completedAt: null,
    })
      .sort({ createdAt: -1 })
      .populate("serviceSeeker")
      .populate("provider")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .lean()
      .exec();

    return serviceRequests;
  }

  @Authorized()
  @Query(() => [ServiceRequest], { nullable: true })
  async availableHiringRequest(
    @Ctx() ctx: MyContext
  ): Promise<ServiceRequest[]> {
    if (!ctx.user) {
      return [];
    }

    const serviceRequests = await ServiceRequestModel.find({
      provider: ctx.user._id,
      canceledAt: null,
      accepted: false,
      startedAt: null,
      ignoredAt: null,
    })
      .populate("serviceSeeker")
      .populate("provider")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .lean()
      .exec();

    return serviceRequests;
  }

  @Authorized()
  @Query(() => ServiceRequest)
  async viewServiceRequest(
    @Arg("serviceRequestId") serviceRequestId: ObjectId
  ): Promise<ServiceRequest> {
    const serviceRequest = await ServiceRequestModel.findOne({
      _id: serviceRequestId,
    })
      .populate("serviceSeeker")
      .populate("provider")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .lean()
      .exec();

    console.log(serviceRequest);
    return serviceRequest;
  }

  @Authorized()
  @Subscription(() => ServiceRequest, {
    topics: Topics.ServiceRequestProgress,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<
      ServiceRequestProgressPayload,
      ServiceRequestProgressArgs
    >) => {
      console.log(payload.serviceRequestId === args.serviceRequestId);
      return true;
    },
  })
  serviceRequestProgress(
    @Root() newServiceRequest: ServiceRequestProgressPayload,
    @Args() args: ServiceRequestProgressArgs
  ): ServiceRequest {
    console.log(args);
    const { serviceRequest } = newServiceRequest;

    return serviceRequest;
  }

  @Authorized()
  @Subscription(() => ServiceRequest, {
    topics: Topics.NewBookingServiceRequest,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<
      NewBookingServiceRequestPayload,
      NewBookingServiceRequestArgs
    >) => {
      return Boolean(
        args.serviceIds.filter(
          item =>
            item === payload.serviceRequest.service._id &&
            !payload.serviceRequest.accepted &&
            !payload.serviceRequest.canceledAt
        ).length
      );
    },
  })
  newBookingServiceRequest(
    @Root() newServiceRequest: NewBookingServiceRequestPayload,
    @Args() args: NewBookingServiceRequestArgs
  ): ServiceRequest {
    console.log(args);
    const { serviceRequest } = newServiceRequest;

    return serviceRequest;
  }

  @Authorized()
  @Subscription(() => ServiceRequest, {
    topics: Topics.NewBookingServiceRequest,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<
      NewHiringServiceRequestPayload,
      NewHiringServiceRequestArgs
    >) => {
      return (
        args.providerId === payload.providerId &&
        !payload.serviceRequest.accepted &&
        !payload.serviceRequest.canceledAt
      );
    },
  })
  newHiringServiceRequest(
    @Root() newServiceRequest: NewHiringServiceRequestPayload,
    @Args() args: NewHiringServiceRequestArgs
  ): ServiceRequest {
    console.log(args);
    const { serviceRequest } = newServiceRequest;

    return serviceRequest;
  }
}
