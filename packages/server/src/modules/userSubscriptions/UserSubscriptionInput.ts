import { Field, InputType } from "type-graphql";
import { PaymentMode } from "../../types/paymentModeEnum";
import { UserSubscription } from "./UserSubscriptionObject";

@InputType()
export class UserSubscriptionInput implements Partial<UserSubscription> {
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
