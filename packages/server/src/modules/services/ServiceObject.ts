import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Category } from "../categories/CategoryObject";
import { ServiceAction } from "../serviceActions/ServiceActionObject";

@ObjectType()
export class Service {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  statement: string;

  @Field(() => Category, { nullable: true })
  category: Category | null;

  @Field(() => [ServiceAction])
  serviceActions: [ServiceAction];

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
