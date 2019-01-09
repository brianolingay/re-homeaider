import { CreateErrorResponse } from "./../../shared/errorResponse";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CreateLoginResponse {
  @Field(() => [CreateErrorResponse], { nullable: true })
  errors: CreateErrorResponse[];
}
