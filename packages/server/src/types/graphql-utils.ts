import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";
import * as express from "express";
import { UserInterface } from "../models/User";

export interface UserInfoInRequest extends express.Request {
  user?: UserInterface;
}

export interface Session extends Express.Session {
  userId?: string;
}

export interface Context {
  req: UserInfoInRequest;
  res: express.Response;
  user: UserInterface;
  pubsub: RedisPubSub;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}

export interface QueryMutationMap {
  [key: string]: Resolver | { [key: string]: Resolver };
}
