require("dotenv-safe").config();
import { ApolloError, ApolloServer } from "apollo-server-express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { GraphQLError } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { createServer } from "http";
import { ObjectId } from "mongodb";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { v4 } from "uuid";
import { ObjectIdScalar } from "./scalars/ObjectIDScalar";
import { UserInfoInRequest } from "./types/Context";
import { createMongooseConn } from "./utils/createMongooseConn";
import { defaultUserAndRole } from "./utils/defaultUserAndRole";
import { refreshTokens, verifyToken } from "./utils/jwtAuth";

const port = process.env.PORT || 4000;

const startServer = async () => {
  await createMongooseConn();

  await defaultUserAndRole();

  const app = express();

  const pubSub = new RedisPubSub(
    process.env.NODE_ENV === "production"
      ? {
          connection: process.env.REDIS_URL as any,
        }
      : {}
  );

  app.set("trust proxy", 1);

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_HOST,
    })
  );
  app.use(async (req: UserInfoInRequest, res, next) => {
    const refreshToken = req.cookies["refresh-token"];
    const accessToken = req.cookies["access-token"];

    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const user = verifyToken(accessToken) as any;
      req.user = user;
      return next();
    } catch {}

    if (!refreshToken) {
      return next();
    }

    let user;

    try {
      user = verifyToken(refreshToken) as any;
    } catch {
      return next();
    }

    // token has been invalidated
    if (!req.user || req.user!.email !== user.email) {
      return next();
    }

    const data = await refreshToken(user);

    res.cookie("refresh-token", data.refreshToken);
    res.cookie("access-token", data.accessToken);
    req.user = data.user;

    return next();
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/*Resolver.*"],
      pubSub,
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      authChecker: ({ context }) => {
        return context.user; // or false if access denied
      },
      validate: false,
    }),
    context: ({ res, req, connection }: any) => ({
      res,
      req,
      user: connection ? connection.context.user : req.user,
    }),
    uploads: {
      maxFileSize: 10000,
      maxFiles: 20,
    },
    subscriptions: {
      path: "/subscriptions",
      onConnect: async ({ token, refreshToken }: any) => {
        console.log({ check: "Checking for token", token, refreshToken });
        if (token && refreshToken) {
          try {
            return await verifyToken(token);
          } catch (err) {
            const newTokens = await refreshTokens(refreshToken);
            return { user: newTokens.user };
          }
        }

        return { user: null };
      },
    },
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);

      return new GraphQLError(`Internal Error: ${errId}`);
    },
    formatResponse: (response: any) => {
      console.log(response);
      return response;
    },
    playground: process.env.NODE_ENV !== "production",
    //debug: process.env.NODE_ENV !== "production",
  });

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
    console.log(process.env.FRONTEND_HOST);
  });
};

startServer();
