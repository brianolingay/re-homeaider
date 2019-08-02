require("dotenv-safe").config();
import { ApolloError, ApolloServer } from "apollo-server-express";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import { GraphQLError } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { createServer } from "http";
import { ObjectId } from "mongodb";
import { RedisClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { v4 } from "uuid";
import { redis } from "./redis";
import { ObjectIdScalar } from "./scalars/ObjectIDScalar";
import { createMongooseConn } from "./utils/createMongooseConn";
import { defaultUserAndRole } from "./utils/defaultUserAndRole";
import { redisSessionPrefix } from "./constants";

const RedisStore = connectRedis(session);

const SESSION_SECRET = process.env.SESSION_SECRET;
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

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_HOST,
    })
  );

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `qid=${qid}`;
      } catch {}
    }

    return next();
  });

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: (redis as unknown) as RedisClient,
      prefix: redisSessionPrefix,
    }),
    name: "qid",
    secret: SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/*Resolver.*"],
      pubSub,
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      authChecker: ({ context }) => {
        return context.session.userId; // or false if access denied
      },
      validate: false,
    }),
    context: ({ res, req, connection }: any) => ({
      redis,
      res,
      req,
      session: req.session || undefined,
      user: connection ? connection.context.user : req.user,
    }),
    uploads: {
      maxFileSize: 10000,
      maxFiles: 20,
    },
    // subscriptions: {
    //   path: "/subscriptions",
    //   onConnect: async ({ token, refreshToken }: any) => {
    //     console.log({ check: "Checking for token", token, refreshToken });
    //     if (token && refreshToken) {
    //       try {
    //         return await verifyToken(token);
    //       } catch (err) {
    //         const newTokens = await refreshTokens(refreshToken);
    //         return { user: newTokens.user };
    //       }
    //     }

    //     return { user: null };
    //   },
    // },
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
    // debug: process.env.NODE_ENV !== "production",
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
