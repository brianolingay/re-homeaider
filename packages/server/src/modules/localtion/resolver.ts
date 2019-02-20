import { Resolver, Query, Authorized, Ctx } from "type-graphql";
import { MyContext } from "./../../types/Context";
import { LocationResponse } from "./response";
import { currentLocation } from "../../repositories/Location";

@Resolver(LocationResponse)
export class LocationResolver {
  constructor() {}

  @Authorized()
  @Query(() => LocationResponse, { nullable: true })
  async currentLocation(@Ctx() ctx: MyContext): Promise<LocationResponse> {
    return currentLocation(ctx);
  }
}
