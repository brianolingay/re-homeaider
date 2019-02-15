import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LocationResponse {
  @Field(() => [Number], { nullable: true })
  coordinates: number[];
}
