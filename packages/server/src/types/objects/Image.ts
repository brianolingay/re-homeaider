import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Image {
  @Field(() => String, { nullable: true })
  filename: string | null;

  @Field(() => String, { nullable: true })
  filepath: string | null;
}
