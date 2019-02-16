import { InputType, Field } from "type-graphql";
import { UserDetailed } from "../../../types/objects/User";

@InputType()
export class RegisterInput implements Partial<UserDetailed> {
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
