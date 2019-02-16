import { InputType, Field } from "type-graphql";
import { UserDetailed } from "../../../types/objects/User";

@InputType()
export class LoginInput implements Partial<UserDetailed> {
  @Field()
  email: string;

  @Field()
  password: string;
}
