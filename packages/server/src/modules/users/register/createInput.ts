import { InputType, Field } from "type-graphql";
import { User } from "src/entity/User";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  mobile: string;

  @Field()
  password: string;
}
