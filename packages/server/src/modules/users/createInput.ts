import { InputType, Field } from "type-graphql";
import { UserDetailed } from "../../types/objects/User";

@InputType()
export class UserInput implements Partial<UserDetailed> {
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
