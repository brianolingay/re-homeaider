import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Image {
  @Field()
  readonly _id: ObjectId;

  @Field()
  filename: string;

  @Field()
  filepath: string;
}
