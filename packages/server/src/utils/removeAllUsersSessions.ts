import { Redis } from "ioredis";
import { userSessionIdPrefix, redisSessionPrefix } from "../constants";
import { ObjectId } from "mongodb";

export const removeAllUsersSessions = async (
  userId: ObjectId,
  redis: Redis
) => {
  const sessionIds = await redis.lrange(
    `${userSessionIdPrefix}${userId.toString()}`,
    0,
    -1
  );

  const promises = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
