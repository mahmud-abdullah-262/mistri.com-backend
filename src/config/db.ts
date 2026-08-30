import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.MONGODB_DB || "mistri_db";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Please define MONGODB_URI in your .env file");
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    console.log("MongoDB connected successfully using Native Driver");
    return { client, db };
}

export async function getDb(): Promise<Db> {
    const { db } = await connectToDatabase();
    return db;
}