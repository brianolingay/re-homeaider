import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../ErrorResponse";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  sessionId?: string;

  @Field(() => ObjectId, { nullable: true })
  userId: ObjectId | null;

  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
