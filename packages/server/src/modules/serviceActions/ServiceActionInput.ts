import { Field, InputType } from "type-graphql";
import { ServiceAction } from "./ServiceActionObject";

@InputType()
export class ServiceActionInput implements Partial<ServiceAction> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
