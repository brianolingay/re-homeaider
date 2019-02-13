import "reflect-metadata";
require("dotenv-safe").config();
import { ApolloServer, ApolloError } from "apollo-server-express";
import { v4 } from "uuid";
import { GraphQLError } from "graphql";
// import * as session from "express-session";
// import * as connectRedis from "connect-redis";
import * as express from "express";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import * as cors from "cors";
import { RedisPubSub } from "graphql-redis-subscriptions";

// import { redis } from "./redis";

import { createMongooseConn } from "./utils/createMongooseConn";
import { ObjectIdScalar } from "./scalars/ObjectIDScalar";
import { userLoader } from "./loaders/userLoader";
// import { UserRepository } from "./repositories/mongoose/user/index";
import { defaultUserAndRole } from "./utils/defaultUserAndRole";
import { verifyToken, refreshTokens } from "./utils/jwtAuth";
import { UserInfoInRequest } from "./types/Context";
import { createServer } from "http";

// const RedisStore = connectRedis(session as any);

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

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/resolver.*"],
    pubSub,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    authChecker: ({ context }) => {
      return Boolean(context.user); // or false if access denied
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, connection }: any) => ({
      req,
      userLoader: userLoader(),
      user: connection ? connection.context.user : req.user,
    }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: async ({ token, refreshToken }: any) => {
        if (token && refreshToken) {
          try {
            const { user } = await verifyToken(token);
            return { user };
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
  });

  app.set("trust proxy", 1);

  const whitelist = [
    "http://localhost:3000",
    "https://homeaider.herokuapp.com",
    `http://localhost:${port}`,
    `ws://localhost:${port}`,
    "https://homeaider-server.herokuapp.com",
    "ws://homeaider-server.herokuapp.com",
  ];

  app.use(
    cors({
      credentials: true,
      origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  app.use(async (req: UserInfoInRequest, res, next) => {
    const token = req.headers["x-token"] as string;
    if (token) {
      try {
        const { user } = await verifyToken(token);
        req.user = user;
      } catch (err) {
        const refreshToken = req.headers["x-refresh-token"] as any;
        const newTokens = await refreshTokens(refreshToken);
        if (newTokens && newTokens.token && newTokens.refreshToken) {
          res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
          res.set("x-token", newTokens.token);
          res.set("x-refresh-token", newTokens.refreshToken);
          req.user = newTokens.user;
        }
      }
    }

    return next();
  });

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
