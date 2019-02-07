import { Request } from "express";
import * as DataLoader from "dataloader";

import { User } from "./objects/User";

export interface MyContext {
  req: Request;
  user: User;
  userLoader: DataLoader<string, User>;
}
