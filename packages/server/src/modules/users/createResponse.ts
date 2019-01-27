import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
