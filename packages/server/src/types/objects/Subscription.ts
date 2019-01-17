import { ObjectType, Field, registerEnumType } from "type-graphql";
import { ObjectId } from "mongodb";
import { PaymentMode } from "../paymentModeEnum";

registerEnumType(PaymentMode, {
  name: "PaymentMode", // this one is mandatory
  description: "Type of payment mode", // this one is optional
});

@ObjectType()
export class Subscription {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  amount: number;

  @Field(() => [String], { nullable: true })
  benefits: string[];

  @Field(() => PaymentMode)
  paymentMode: PaymentMode;
}
