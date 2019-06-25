import { Field, InputType } from "type-graphql";
import { Service } from "./ServiceObject";

@InputType()
export class ServiceInput implements Partial<Service> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  statement: string;
}
