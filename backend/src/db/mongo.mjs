import { MongoClient } from "mongodb";
import { MONGODB_URI, MONGODB_DB_NAME } from "../config/env.mjs";

let client;

export async function getDb() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("[mongo] Connected to MongoDB");
  }

  return client.db(MONGODB_DB_NAME);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}


