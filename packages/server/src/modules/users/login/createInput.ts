import { InputType, Field } from "type-graphql";

@InputType()
export class CreateLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
