import { ObjectId } from "mongodb";
import { Field, ArgsType, ID } from "type-graphql";
import { AvailableBookingInput } from "./input";

@ArgsType()
export class ServiceRequestProgressArgs {
  @Field(() => ID)
  serviceRequestId: string;
}

@ArgsType()
export class NewBookingServiceRequestArgs {
  @Field(() => AvailableBookingInput)
  input: AvailableBookingInput;
}

@ArgsType()
export class NewHiringServiceRequestArgs {
  @Field()
  providerId: ObjectId;
}
