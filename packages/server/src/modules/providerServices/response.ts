import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "./../shared/errorResponse";

@ObjectType()
export class ProviderServiceResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
