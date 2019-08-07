import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Category } from "../categories/CategoryObject";

@ObjectType()
export class Service {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Category], { nullable: true })
  categories: Category[] | null;

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
