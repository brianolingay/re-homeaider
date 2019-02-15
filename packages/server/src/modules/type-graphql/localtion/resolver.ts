import { Resolver, Query, Authorized, Ctx } from "type-graphql";
import { MyContext } from "./../../types/Context";
import { LocationResponse } from "./response";

// @ts-ignore
const geoIpLite = require("geoip-lite");

@Resolver(LocationResponse)
export class LocationResolver {
  constructor() {}

  @Authorized()
  @Query(() => LocationResponse, { nullable: true })
  async currentLocation(@Ctx() ctx: MyContext): Promise<LocationResponse> {
    console.log(ctx.req.hostname);
    const location =
      ctx.req.hostname !== "192.168.254.102"
        ? geoIpLite.lookup(ctx.req.ip)
        : geoIpLite.lookup("180.190.182.235");

    console.log(location);
    console.log(location);

    return { coordinates: location.ll };
  }
}
