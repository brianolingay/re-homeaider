import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";
import { Category } from "./../../types/objects/Category";

@ObjectType()
export class CategoryResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}

@ObjectType()
export class AvailableCategorieResponse implements Partial<Category> {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => Number)
  totalServices: number;
}
