import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Role {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field()
  key: string;

  @Field(() => String, { nullable: true })
  description: string | null;
}
