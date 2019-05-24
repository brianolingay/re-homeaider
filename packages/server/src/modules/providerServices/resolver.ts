import { Resolver, Query, Authorized, Arg, Mutation, Ctx } from "type-graphql";
import { ObjectId } from "mongodb";
import { MyContext } from "./../../types/Context";
import { ProviderService } from "../../types/objects/ProviderService";
import { ProviderServiceInput } from "./input";
import { ProviderServiceModel } from "../../models/ProviderService";
import { ProviderServiceResponse } from "./response";
import { processUpload } from "../../utils/processUpload";

@Resolver(ProviderService)
export class ProviderServiceResolver {
  constructor() {}

  @Authorized()
  @Mutation()
  async createProviderService(
    @Arg("input") providerServiceInput: ProviderServiceInput,
    @Ctx() ctx: MyContext
  ): Promise<ProviderServiceResponse> {
    const certificates = [];
    const { certificates: certs, service } = providerServiceInput;

    for (const cert of certs) {
      const { name, description, file } = cert;
      certificates.push({
        name,
        description,
        image: {
          filename: file.filename,
          filepath: await processUpload(file),
        },
      });
    }

    const providerService = new ProviderServiceModel({
      service,
      user: ctx.user._id,
      certificates,
    });

    try {
      await providerService.save();
    } catch(err) {
      return {
        errors: [{
          path: "providerservices",
          message: "Something went wrong while saving."
        }]
      }
    }

    return { errors: [] };
  }

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
