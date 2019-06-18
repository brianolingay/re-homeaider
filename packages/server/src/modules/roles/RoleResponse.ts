import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../ErrorResponse";

@ObjectType()
export class RoleResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
