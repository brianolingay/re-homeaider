import { ObjectId } from "mongodb";
import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class ServiceRequestProgressArgs {
  @Field()
  serviceRequestId: ObjectId;
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
