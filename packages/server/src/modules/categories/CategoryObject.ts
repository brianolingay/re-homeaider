import { GraphQLJSON } from "graphql-type-json";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Service } from "../services/ServiceObject";

@ObjectType()
export class Category {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Service)
  service: Service;

  @Field()
  statement: string;

  @Field(() => GraphQLJSON)
  details: any;

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}
