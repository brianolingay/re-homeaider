import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "./../../shared/errorResponse";
import { User } from "../../../types/objects/User";

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
