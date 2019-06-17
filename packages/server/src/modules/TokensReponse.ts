import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TokensResponse {
  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;
}
