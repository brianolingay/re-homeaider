import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { validServiceSchema } from "@homeaider/common";

import { CategoryModel } from "./../../models/Category";

import { ServiceModel } from "./../../models/Service";
import { Service } from "../../types/objects/Service";

import { ServiceResponse, FindServicesByCategoryResponse } from "./response";
import { ServiceInput } from "./input";

import { formatYupError } from "../../utils/formatYupError";

@Resolver(Service)
export class ServiceResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => ServiceResponse, { nullable: true })
  async createService(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("input") serviceInput: ServiceInput
  ): Promise<ServiceResponse | null> {
    try {
      await validServiceSchema.validate(
        { ...serviceInput, category: categoryId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const category = await CategoryModel.findOne({ _id: categoryId })
      .lean()
      .exec();

    const serviceAlreadyExists = await ServiceModel.findOne(
      { name, category: category._id },
      "_id",
      {
        lean: true,
      }
    ).exec();

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

    const serviceModel = new ServiceModel({
      ...serviceInput,
      category: category!._id,
    });

    const service = await serviceModel.save();

    await CategoryModel.updateOne(
      { _id: categoryId },
      { services: [...category!.services, service._id] }
    );

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => ServiceResponse, { nullable: true })
  async updateService(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("serviceId") serviceId: ObjectId,
    @Arg("input") serviceInput: ServiceInput
  ): Promise<ServiceResponse | null> {
    try {
      await validServiceSchema.validate(
        { ...serviceInput, category: categoryId },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = serviceInput;

    const serviceAlreadyExists = await ServiceModel.findOne(
      { name, category: categoryId, _id: { $ne: serviceId } },
      "_id",
      {
        lean: true,
      }
    ).exec();

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

    await ServiceModel.updateOne({ _id: serviceId }, { ...serviceInput });

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => ServiceResponse, { nullable: true })
  async deleteService(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<ServiceResponse | null> {
    try {
      const category = await CategoryModel.findById(categoryId)
        .lean()
        .exec();
      const deleted = await ServiceModel.deleteOne({
        _id: serviceId,
      });

      if (deleted && category) {
        const newServices = category.services.filter(
          (id: ObjectId) => id !== serviceId
        );

        await CategoryModel.updateOne(
          { _id: categoryId },
          { services: newServices }
        );
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
    const services = await ServiceModel.find({})
      .populate("category")
      .lean()
      .exec();

    return services;
  }

  @Authorized()
  @Query(() => [FindServicesByCategoryResponse], { nullable: true })
  async findServicesByCategory(
    @Arg("categoryId") categoryId: ObjectId
  ): Promise<FindServicesByCategoryResponse[]> {
    const services = await ServiceModel.aggregate([
      {
        $match: { category: categoryId },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "services",
          as: "users_doc",
        },
      },
      { $match: { users_doc: { $ne: [] } } },
      {
        $project: {
          _id: 1,
          name: 1,
          totalUsers: {
            $size: "$users_doc",
          },
        },
      },
    ]);

    return services;
  }
}
