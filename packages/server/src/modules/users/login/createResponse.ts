import { TokensResponse } from "./../../shared/tokensReponse";
import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "./../../shared/errorResponse";
import { UserDetailed } from "../../../types/objects/User";

@ObjectType()
export class LoginResponse {
  @Field(() => TokensResponse, { nullable: true })
  tokens: TokensResponse | null;

  @Field(() => UserDetailed, { nullable: true })
  user: UserDetailed | null;

  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
