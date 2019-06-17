import { Request } from "express";
// import * as DataLoader from "dataloader";
import { User } from "../modules/users/UserObject";

export interface MyContext {
  req: Request;
  // user: User;
  // userLoader: DataLoader<string, User>;
}

export interface UserInfoInRequest extends Request {
  user?: User | null;
}
