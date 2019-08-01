import { Redis } from "ioredis";
import { Request, Response as ERes } from "express";
import { ObjectId } from "mongodb";
// import * as DataLoader from "dataloader";
import { User } from "../modules/users/UserObject";

export interface Session extends Express.Session {
  userId?: ObjectId;
}

export interface MyContext {
  redis: Redis;
  res: ERes;
  req: Request;
  session: Session;
  user: User;
  // userLoader: DataLoader<string, User>;
}

export interface UserInfoInRequest extends Request {
  user?: User | null;
}
