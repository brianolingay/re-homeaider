import { User } from "./User";
import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { Service } from "protobufjs";

@ObjectType()
export class ServiceRequest {
  @Field()
  readonly _id: ObjectId;

  @Field(() => User)
  aidee: User;

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

  @Field(() => Date, { nullable: true })
  arrivedAt: Date | null;

  @Field(() => Date, { nullable: true })
  startedAt: Date | null;

  @Field(() => Date, { nullable: true })
  canceledAt: Date | null;

  @Field(() => Date, { nullable: true })
  completedAt: Date | null;

  @Field(() => Date, { nullable: true })
  ignoredAt: Date | null;

  @Field({ nullable: true })
  feedBack: string;

  @Field(() => Number)
  rating: number;
}
