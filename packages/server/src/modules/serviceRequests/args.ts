import { ObjectId } from "mongodb";
import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class ServiceRequestProgressArgs {
  @Field()
  serviceRequestId: ObjectId;
}
