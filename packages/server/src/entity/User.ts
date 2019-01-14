import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  mobile: string;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String, { nullable: true })
  address: string | null;

  @Field(() => String, { nullable: true })
  city: string | null;

  @Field(() => String, { nullable: true })
  country: string | null;

  @Field(() => [Number], { nullable: true })
  coordinates: number[] | null;
}
