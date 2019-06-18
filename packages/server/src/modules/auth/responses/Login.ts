import { Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../ErrorResponse";
import { User } from "../../users/UserObject";

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
