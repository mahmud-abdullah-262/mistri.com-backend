import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb } from "./db.js";

export const auth = betterAuth({
    database: mongodbAdapter(await getDb()),
    trustedOrigins: ["http://localhost:3000"],
    advanced: {
        disableCSRFCheck: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "customer",
            },
            phone: {
                type: "string",
                required: false,
            },
            area: {
                type: "string",
                required: false,
            },
            isVerified: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
});