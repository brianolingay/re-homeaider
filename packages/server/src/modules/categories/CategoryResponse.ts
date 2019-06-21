import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Category } from "./CategoryObject";

@ObjectType()
export class AvailableCategorieResponse implements Partial<Category> {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => Number)
  totalServices: number;
}
