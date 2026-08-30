import { getDb } from "../config/db.js";
import type { UserDocument } from "../types/user.js";

export async function getUsersCollection() {
    const db = await getDb();
    return db.collection<UserDocument>("users");
}