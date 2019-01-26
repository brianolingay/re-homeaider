import * as mongoose from "mongoose";

export const createMongooseConn = async () => {
  // const dbName =
  //   process.env.NODE_ENV === "test" ? "test-homeaider" : "homeaider";
  const dbUri = `${process.env.MONGODB_URI}`;

  const conn = await mongoose.connect(dbUri, {
    useNewUrlParser: true,
  });

  conn.set("debug", true);

  if (process.env.NODE_ENV === "test") {
    await conn.connection.dropDatabase();
  }

  return conn;
};
