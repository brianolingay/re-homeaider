import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { ProviderServiceWithService } from "./ProviderService";
import { Role } from "./Role";
import { UserSubscription } from "./UserSubscription";

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
}

@ObjectType()
export class UserDetailed extends User {
  @Field(() => UserSubscription, { nullable: true })
  userSubscription: UserSubscription | null;

  @Field(() => Date, { nullable: true })
  subscribedAt: Date | null;

  @Field(() => [ProviderServiceWithService], { nullable: true })
  providerServices: ProviderServiceWithService[];

  @Field(() => Role, { nullable: true })
  role: Role | null;
}
