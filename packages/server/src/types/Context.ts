import { Request } from "express";
import * as DataLoader from "dataloader";

import { User } from "../entity/User";

export interface MyContext {
  req: Request;
  userLoader: DataLoader<string, User>;
}
