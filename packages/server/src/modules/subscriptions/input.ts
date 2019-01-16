import { InputType, Field } from "type-graphql";
import { Subscription } from "../../types/objects/Subscription";
import { PaymentMode } from "./../../types/paymentModeEnum";

@InputType()
export class SubscriptionInput implements Partial<Subscription> {
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
