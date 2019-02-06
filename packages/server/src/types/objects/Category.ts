import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { Service } from "./Service";

@ObjectType()
export class Category {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Service], { nullable: true })
  services: Service[] | null;

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
