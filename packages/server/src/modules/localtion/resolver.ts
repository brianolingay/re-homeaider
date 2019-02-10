import { Resolver, Query, Authorized, Ctx } from "type-graphql";
import { MyContext } from "./../../types/Context";
import { LocationResponse } from "./response";

const geoIpLite = require("geoip-lite");

@Resolver(LocationResponse)
export class LocationResolver {
  constructor() {}

  @Authorized()
  @Query(() => LocationResponse, { nullable: true })
  async currentLocation(@Ctx() ctx: MyContext): Promise<LocationResponse> {
    const location =
      ctx.req.host !== "localhost"
        ? geoIpLite.lookup(ctx.req.ip)
        : geoIpLite.lookup("207.97.227.239");

    console.log(location);
    console.log(location);

    return { coordinates: location.ll };
  }
}
