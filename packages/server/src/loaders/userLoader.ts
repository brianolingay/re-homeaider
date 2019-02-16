import * as DataLoader from "dataloader";
import { UserDetailed } from "../types/objects/User";
import { UserModel } from "../models/User";

export const userLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const users = await UserModel.find({ _id: { $in: keys } });

    const userMap: { [key: string]: UserDetailed } = {};

    users.forEach(u => {
      userMap[u.id] = u;
    });

    // O(n) * O(1)
    return keys.map(k => userMap[k]);
  });
