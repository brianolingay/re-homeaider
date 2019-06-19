import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class FormSubmitResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
