import { Resolver, Query, Authorized, Ctx } from "type-graphql";
import { LocationResponse } from "./LocationResponse";
import { MyContext } from "../../types/Context";
import { currentLocation } from "./currentLocation";

@Resolver(LocationResponse)
export class LocationResolver {
  constructor() {}

  @Authorized()
  @Query(() => LocationResponse, { nullable: true })
  async currentLocation(@Ctx() ctx: MyContext): Promise<LocationResponse> {
    return currentLocation(ctx);
  }
}
