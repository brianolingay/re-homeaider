import { InputType, Field } from "type-graphql";
import { User } from "../../../types/objects/User";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
