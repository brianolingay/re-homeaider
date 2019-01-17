import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { Subscription } from "./Subscription";
import { Role } from "./Role";

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

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

  @Field(() => Subscription, { nullable: true })
  subscription: Subscription | null;

  @Field(() => Date, { nullable: true })
  subscribedAt: Date | null;

  @Field(() => Role, { nullable: true })
  role: Role | null;
}
