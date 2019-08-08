import { validServiceSchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import { FormSubmitResponse } from "../FormSubmitResponse";
import ServiceDBA from "./ServiceDBA";
import { ServiceInput } from "./ServiceInput";
import { Service } from "./ServiceObject";

@Resolver(Service)
export class ServiceResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createService(
    @Arg("input") serviceInput: ServiceInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceSchema.validate(serviceInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const serviceAlreadyExists = await ServiceDBA.doExists({
      name,
    });

    if (serviceAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    await ServiceDBA.create(serviceInput);

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateService(
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("input") serviceInput: ServiceInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceSchema.validate(serviceInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const serviceAlreadyExists = await ServiceDBA.doExists({
      name,
      _id: { $ne: serviceId },
    });

    if (serviceAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    try {
      await ServiceDBA.update({ _id: serviceId }, { ...serviceInput });
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteService(
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      await ServiceDBA.delete({
        _id: serviceId,
      });
    } catch {
      return {
        errors: [
          {
            path: "service",
            message: "Something went wrong!",
          },
        ],
      };
    }

    return null;
  }

  @Authorized()
  @Query(() => [Service], { nullable: true })
  async services(): Promise<Service[]> {
    return await ServiceDBA.findAll();
  }

  @Authorized()
  @Query(() => Service, { nullable: true })
  async service(@Arg("serviceId") serviceId: ObjectId): Promise<Service> {
    return await ServiceDBA.get(serviceId);
  }
}
