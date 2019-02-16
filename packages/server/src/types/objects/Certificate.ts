import { ObjectType, Field } from "type-graphql";
import { Image } from "./Image";

@ObjectType()
export class Certificate {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Image], { nullable: true })
  images: Image[];

  @Field(() => Date, { nullable: true })
  certifiedAt: Date | null;
}
