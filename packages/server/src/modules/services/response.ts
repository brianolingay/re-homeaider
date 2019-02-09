import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { ErrorResponse } from "../shared/errorResponse";
import { Service } from "../../types/objects/Service";

@ObjectType()
export class ServiceResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors: ErrorResponse[];
}

@ObjectType()
export class FindServiceByCategoryResponse implements Partial<Service> {
  @Field()
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => Number)
  totalUsers: number;
}
