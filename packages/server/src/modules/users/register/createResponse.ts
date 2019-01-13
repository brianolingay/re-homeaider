import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../../shared/errorResponse";

@ObjectType()
export class RegisterResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
