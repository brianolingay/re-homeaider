import { InputType, Field } from "type-graphql";
import { UserSubscription } from "../../types/objects/UserSubscription";
import { PaymentMode } from "./../../types/paymentModeEnum";

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
