export const appConfig = {
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
  mongodbUri: process.env.MONGODB_URI ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
};
