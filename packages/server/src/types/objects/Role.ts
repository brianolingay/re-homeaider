import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Role {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;
}
