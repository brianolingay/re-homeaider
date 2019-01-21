import { InputType, Field } from "type-graphql";
import { Category } from "./../../types/objects/Category";

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
