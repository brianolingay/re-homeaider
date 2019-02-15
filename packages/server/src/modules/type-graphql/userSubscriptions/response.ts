import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";

@ObjectType()
export class UserSubscriptionResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
