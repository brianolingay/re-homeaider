import { InputType, Field } from "type-graphql";
import { Service } from "./../../types/objects/Service";

@InputType()
export class ServiceInput implements Partial<Service> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
