import { Service } from "./Service";
import { Certificate } from "./Certificate";
import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class ProviderService {
  @Field()
  readonly _id: ObjectId;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Certificate], { nullable: true })
  certificates: Certificate[];

  @Field(() => Boolean)
  approved: boolean;

  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;
}

@ObjectType()
export class ProviderServiceWithService extends ProviderService {
  @Field(() => Service)
  service: Service;
}

@ObjectType()
export class ProviderServiceWithUser extends ProviderServiceWithService {
  @Field(() => User)
  user: User;
}
