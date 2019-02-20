import { Resolver, Query, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { ProviderServiceModel } from "../../models/ProviderService";
import { ProviderService } from "../../types/objects/ProviderService";

@Resolver(ProviderService)
export class ProviderServiceResolver {
  constructor() {}

  @Authorized()
  @Query(() => [ProviderService], { nullable: true })
  async providersByService(
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<ProviderService[]> {
    const providers = await ProviderServiceModel.find({
      service: serviceId,
    })
      .populate("user")
      .populate({
        path: "service",
        populate: { path: "category" },
      })
      .lean()
      .exec();

    return providers;
  }
}
