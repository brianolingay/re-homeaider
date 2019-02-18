import { ObjectId } from "mongodb";
import { Field, ArgsType, ID } from "type-graphql";

@ArgsType()
export class ServiceRequestProgressArgs {
  @Field(() => ID)
  serviceRequestId: string;
}

@ArgsType()
export class NewBookingServiceRequestArgs {
  @Field(() => [ObjectId])
  serviceIds: ObjectId[];
}

@ArgsType()
export class NewHiringServiceRequestArgs {
  @Field()
  providerId: ObjectId;
}
