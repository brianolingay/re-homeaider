import { ObjectId } from "mongodb";
import { InputType, Field } from "type-graphql";

@InputType()
export class ServiceRequestInput {
  @Field(() => ObjectId, { nullable: true })
  service: ObjectId;

  @Field(() => ObjectId, { nullable: true })
  provider: ObjectId | null;

  @Field(() => Number, { nullable: true })
  amount: number;

  @Field({ nullable: true })
  address: string;

  @Field(() => [Number], { nullable: true })
  coordinates: number[];

  @Field(() => Boolean, { nullable: true })
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

  @Field(() => Number, { nullable: true })
  rating: number;
}
