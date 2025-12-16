import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ??
  (() => {
    // Fail fast so misconfiguration is obvious in CI / production.
    throw new Error("Please define the MONGODB_URI environment variable");
  })();

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// In development, Next.js reloads modules frequently (HMR). Caching the connection
// on `globalThis` prevents creating a new connection on every reload.
const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalForMongoose.mongoose = cached;

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Avoid buffering commands when the connection is down; instead fail fast.
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
