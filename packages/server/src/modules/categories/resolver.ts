import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { validCategorySchema } from "@homeaider/common";

import { CategoryModel } from "./../../models/Category";
import { Category } from "../../types/objects/Category";

import { CategoryResponse, AvailableCategorieResponse } from "./response";
import { CategoryInput } from "./input";

import { formatYupError } from "../../utils/formatYupError";

@Resolver(Category)
export class CategoryResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => CategoryResponse, { nullable: true })
  async createCategory(
    @Arg("input") categoryInput: CategoryInput
  ): Promise<CategoryResponse> {
    try {
      await validCategorySchema.validate(categoryInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = categoryInput;

    const categoryAlreadyExists = await CategoryModel.findOne({ name }, "_id", {
      lean: true,
    }).exec();

    if (categoryAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    const category = new CategoryModel(categoryInput);

    await category.save();

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => CategoryResponse, { nullable: true })
  async updateCategory(
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("input") categoryInput: CategoryInput
  ): Promise<CategoryResponse> {
    try {
      await validCategorySchema.validate(categoryInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = categoryInput;

    const categoryAlreadyExists = await CategoryModel.findOne(
      { name, _id: { $ne: categoryId } },
      "_id",
      {
        lean: true,
      }
    ).exec();

    if (categoryAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    await CategoryModel.updateOne({ _id: categoryId }, { ...categoryInput });

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => CategoryResponse, { nullable: true })
  async deleteCategory(
    @Arg("categoryId") categoryId: ObjectId
  ): Promise<CategoryResponse | null> {
    try {
      await CategoryModel.deleteOne({ _id: categoryId });
    } catch {
      return {
        errors: [
          {
            path: "category",
            message: "Something went wrong!",
          },
        ],
      };
    }

    return null;
  }

  @Authorized()
  @Query(() => [Category], { nullable: true })
  async categories(): Promise<Category[]> {
    const categories = await CategoryModel.find({})
      .populate({ path: "services", populate: { path: "category" } })
      .exec();

    return categories;
  }

  @Authorized()
  @Query(() => [AvailableCategorieResponse], { nullable: true })
  async availableCategories(): Promise<AvailableCategorieResponse[]> {
    const aggregate = [
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "category",
          as: "services_doc",
        },
      },
      {
        $unwind: {
          path: "$services_doc",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "providerservices",
          localField: "services_doc._id",
          foreignField: "service",
          as: "services_doc.ps_doc",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          services: {
            $push: "$services_doc",
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalServices: {
            $size: {
              $filter: {
                input: "$services",
                as: "sd",
                cond: {
                  $ne: [
                    {
                      $filter: {
                        input: "$$sd.ps_doc",
                        as: "ps",
                        cond: { $eq: ["$$ps.approved", true] },
                      },
                    },
                    [],
                  ],
                },
              },
            },
          },
        },
      },
    ];

    const categories = await CategoryModel.aggregate(aggregate);

    return categories;
  }
}
