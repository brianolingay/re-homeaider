import { Category } from "./Category";
import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Service {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Category)
  category: Category;

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
