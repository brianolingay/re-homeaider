import { Resolver, Query, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { ProviderServiceModel } from "../../models/ProviderService";
import { ProviderServiceWithUser } from "../../types/objects/ProviderService";

@Resolver(ProviderServiceWithUser)
export class ProviderServiceResolver {
  constructor() {}

  @Authorized()
  @Query(() => [ProviderServiceWithUser], { nullable: true })
  async providersByService(
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<ProviderServiceWithUser[]> {
    const providers = await ProviderServiceModel.find({
      service: serviceId,
    })
      .populate("user")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .exec();

    return providers;
  }
}
