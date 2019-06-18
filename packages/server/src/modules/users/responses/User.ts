import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../../ErrorResponse";

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
