import { InputType, Field } from "type-graphql";
import { User } from "../../types/objects/User";

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  mobile: string;
}
