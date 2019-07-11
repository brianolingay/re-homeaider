import { InputType, Field } from "type-graphql";
import { User } from "../../users/UserObject";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
