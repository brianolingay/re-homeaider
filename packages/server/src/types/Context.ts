import { Request } from "express";
import * as DataLoader from "dataloader";

import { UserDetailed } from "./objects/User";

export interface MyContext {
  req: Request;
  user: UserDetailed;
  userLoader: DataLoader<string, UserDetailed>;
}

export interface UserInfoInRequest extends Request {
  user?: UserDetailed | null;
}
