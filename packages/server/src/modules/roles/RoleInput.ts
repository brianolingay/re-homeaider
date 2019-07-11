import { InputType, Field } from "type-graphql";
import { Role } from "./RoleObject";

@InputType()
export class RoleInput implements Partial<Role> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
