import { MyContext } from "server/src/types/Context";

// @ts-ignore
const geoIpLite = require("geoip-lite");

interface CurrentLocation {
  coordinates: number[];
}

const testHosts = ["192.168.254.102", "localhost"];

export const currentLocation = (ctx: MyContext): CurrentLocation => {
  const location =
    testHosts.filter(item => ctx.req.hostname === item).length > 0
      ? geoIpLite.lookup("180.190.182.235")
      : geoIpLite.lookup(ctx.req.ip);

  return { coordinates: location.ll };
};
