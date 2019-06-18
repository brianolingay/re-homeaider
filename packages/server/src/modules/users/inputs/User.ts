import { InputType, Field } from "type-graphql";
import { User } from "../UserObject";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  mobile: string;

  @Field({ nullable: true })
  password: string;
}
