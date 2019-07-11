import { validServiceActionSchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import { FormSubmitResponse } from "../FormSubmitResponse";
import ServiceDBA from "../services/ServiceDBA";
import ServiceActionDBA from "./ServiceActionDBA";
import { ServiceActionInput } from "./ServiceActionInput";
import { ServiceAction } from "./ServiceActionObject";

@Resolver(ServiceAction)
export class ServiceActionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createService(
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("input") serviceActionInput: ServiceActionInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceActionSchema.validate(
        { ...serviceActionInput, category: serviceId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceActionInput;

    const service = await ServiceDBA.get(serviceId);

    const serviceActionAlreadyExists = await ServiceDBA.doExists({
      name,
      service: service._id,
    });

    if (serviceActionAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    const serviceAction = await ServiceActionDBA.create({
      ...serviceActionInput,
      service: service!._id,
    });

    await ServiceDBA.update(
      { _id: serviceId },
      { services: [...service!.services, serviceAction._id] }
    );

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateService(
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("serviceAction") serviceActionId: ObjectId,
    @Arg("input") serviceActionInput: ServiceActionInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceActionSchema.validate(
        { ...serviceActionInput, service: serviceId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceActionInput;

    const serviceActionAlreadyExists = await ServiceActionDBA.doExists({
      name,
      service: serviceId,
      _id: { $ne: serviceActionId },
    });

    if (serviceActionAlreadyExists) {
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
      await ServiceActionDBA.update(
        { _id: serviceActionId },
        { ...serviceActionInput }
      );
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteService(
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("serviceActionId") serviceActionId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      const service = await ServiceDBA.get(serviceId);
      const deleted = await ServiceActionDBA.delete({
        _id: serviceId,
      });

      if (deleted && service) {
        const newServiceActions = service.serviceActions.filter(
          (id: ObjectId) => id !== serviceActionId
        );

        try {
          await ServiceDBA.update(
            { _id: serviceId },
            { services: newServiceActions }
          );
        } catch (error) {
          throw error;
        }
      }
    } catch {
      return {
        errors: [
          {
            path: "serviceAction",
            message: "Something went wrong!",
          },
        ],
      };
    }

    return null;
  }

  @Authorized()
  @Query(() => [ServiceAction], { nullable: true })
  async services(): Promise<ServiceAction[]> {
    return await ServiceActionDBA.findAll();
  }
}
