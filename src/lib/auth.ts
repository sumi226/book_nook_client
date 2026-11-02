import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!mongoUri) {
  throw new Error("MONGODB_URI must be configured for authentication");
}
if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters");
}

const client = new MongoClient(mongoUri);
const database = client.db(process.env.MONGODB_DB || "booknook");
const appOrigin = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const socialProviders =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : undefined;

export const auth = betterAuth({
  database: mongodbAdapter(database),
  baseURL: appOrigin,
  secret: authSecret,
  trustedOrigins: [appOrigin],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
  },
  ...(socialProviders ? { socialProviders } : {}),
  plugins: [
    jwt({
      jwks: {
        keyPairConfig: { alg: "EdDSA" },
      },
      jwt: {
        definePayload: ({ user }) => ({
          email: user.email,
          name: user.name,
        }),
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;

      const password = context.body?.password;
      if (
        typeof password !== "string" ||
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Password must be at least 6 characters and include an uppercase and lowercase letter.",
        });
      }

      const image = context.body?.image;
      let isPhotoUrl = false;
      if (typeof image === "string") {
        try {
          const parsed = new URL(image);
          isPhotoUrl = parsed.protocol === "https:" || parsed.protocol === "http:";
        } catch {
          isPhotoUrl = false;
        }
      }
      if (!isPhotoUrl) {
        throw new APIError("BAD_REQUEST", {
          message: "A valid photo URL using HTTP or HTTPS is required.",
        });
      }
    }),
  },
});
