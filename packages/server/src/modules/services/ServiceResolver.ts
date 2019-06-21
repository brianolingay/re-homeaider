import { validServiceSchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import CategoryDBA from "../categories/CategoryDBA";
import { FormSubmitResponse } from "../FormSubmitResponse";
import ServiceDBA from "./ServiceDBA";
import { ServiceInput } from "./ServiceInput";
import { Service } from "./ServiceObject";
import { FindServicesByCategoryResponse } from "./ServiceResponse";

@Resolver(Service)
export class ServiceResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createService(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("input") serviceInput: ServiceInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceSchema.validate(
        { ...serviceInput, category: categoryId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const category = await CategoryDBA.get(categoryId);

    const serviceAlreadyExists = await ServiceDBA.doExists({
      name,
      category: category._id,
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

    const service = await ServiceDBA.create({
      ...serviceInput,
      category: category!._id,
    });

    await CategoryDBA.update(
      { _id: categoryId },
      { services: [...category!.services, service._id] }
    );

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateService(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("input") serviceInput: ServiceInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validServiceSchema.validate(
        { ...serviceInput, category: categoryId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const serviceAlreadyExists = await ServiceDBA.doExists({
      name,
      category: categoryId,
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
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      const category = await CategoryDBA.get(categoryId);
      const deleted = await ServiceDBA.delete({
        _id: serviceId,
      });

      if (deleted && category) {
        const newServices = category.services.filter(
          (id: ObjectId) => id !== serviceId
        );

        try {
          await CategoryDBA.update(
            { _id: categoryId },
            { services: newServices }
          );
        } catch (error) {
          throw error;
        }
      }
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
  @Query(() => [FindServicesByCategoryResponse], { nullable: true })
  async findServicesByCategory(
    @Arg("categoryId") categoryId: ObjectId
  ): Promise<FindServicesByCategoryResponse[]> {
    return await ServiceDBA.getAllAvailableServiceByCategory(categoryId);
  }
}
