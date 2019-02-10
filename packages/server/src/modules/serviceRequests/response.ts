import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";

@ObjectType()
export class ServiceRequestResponse {
  @Field(() => ObjectId, { nullable: true })
  serviceRequestId: ObjectId | null;

  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}
