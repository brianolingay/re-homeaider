import { validCategorySchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import { FormSubmitResponse } from "../FormSubmitResponse";
import CategoryDBA from "./CategoryDBA";
import { CategoryInput } from "./CategoryInput";
import { Category } from "./CategoryObject";
import { AvailableCategorieResponse } from "./CategoryResponse";

@Resolver(Category)
export class CategoryResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createCategory(
    @Arg("service") service: ObjectId,
    @Arg("input") categoryInput: CategoryInput
  ): Promise<FormSubmitResponse> {
    try {
      await validCategorySchema.validate(
        { ...categoryInput, service },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = categoryInput;

    const categoryAlreadyExists = await CategoryDBA.doExists({ name, service });

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

    try {
      await CategoryDBA.create({ ...categoryInput, service });
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateCategory(
    @Arg("service") service: ObjectId,
    @Arg("categoryId") categoryId: ObjectId,
    @Arg("input") categoryInput: CategoryInput
  ): Promise<FormSubmitResponse> {
    try {
      await validCategorySchema.validate(
        { ...categoryInput, service },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = categoryInput;

    const categoryAlreadyExists = await CategoryDBA.doExists({
      name,
      service,
      _id: { $ne: categoryId },
    });

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

    try {
      await CategoryDBA.update({ _id: categoryId }, { ...categoryInput });
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteCategory(
    @Arg("categoryId") categoryId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      await CategoryDBA.delete({ _id: categoryId });
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
    return await CategoryDBA.findAll();
  }

  @Authorized()
  @Query(() => [AvailableCategorieResponse], { nullable: true })
  async availableCategories(): Promise<AvailableCategorieResponse[]> {
    return await CategoryDBA.getAllAvailable();
  }
}
