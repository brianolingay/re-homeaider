import { Field, InputType } from "type-graphql";
import { Category } from "./CategoryObject";

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
