import { InputType, Field } from "type-graphql";
import { Role } from "../../types/objects/Role";

@InputType()
export class RoleInput implements Partial<Role> {
  @Field()
  name: string;

  @Field()
  description: string;
}
