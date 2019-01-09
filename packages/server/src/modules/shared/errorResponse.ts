import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CreateErrorResponse {
  @Field()
  path: string;

  @Field()
  message: string;
}
