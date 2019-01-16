import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";

@ObjectType()
export class SubscriptionResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
