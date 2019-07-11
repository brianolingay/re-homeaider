import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Service } from "./ServiceObject";

@ObjectType()
export class FindServicesByCategoryResponse implements Partial<Service> {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => Number)
  totalUsers: number;
}
