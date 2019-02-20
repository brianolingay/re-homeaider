import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { Service } from "./Service";
import { User } from "./User";

@ObjectType()
export class ServiceRequest {
  @Field()
  readonly _id: ObjectId;

  @Field(() => User)
  serviceSeeker: User;

  @Field(() => User, { nullable: true })
  provider: User | null;

  @Field(() => Service)
  service: Service;

  @Field(() => Number)
  amount: number;

  @Field()
  address: string;

  @Field(() => [Number])
  coordinates: number[];

  @Field(() => Boolean)
  accepted: boolean;

  @Field(() => String, { nullable: true })
  arrivedAt: string | null;

  @Field(() => String, { nullable: true })
  startedAt: string | null;

  @Field(() => String, { nullable: true })
  canceledAt: string | null;

  @Field(() => String, { nullable: true })
  completedAt: string | null;

  @Field(() => String, { nullable: true })
  ignoredAt: string | null;

  @Field(() => String, { nullable: true })
  feedBack: string | null;

  @Field(() => Number)
  rating: number;
}
