import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { Image } from "./Image";

@ObjectType()
export class Certificate {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Date)
  certifiedAt: Date;

  @Field(() => Image)
  image: Image;
}
