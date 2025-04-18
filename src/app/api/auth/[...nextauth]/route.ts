import { connectDB } from "@pal/lib/mongodb";
import { User } from "@pal/models/user";
import { appConfig } from "@pal/utils/appconfig";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions = {
  providers: [
    Github({
      clientId: appConfig.githubClientId,
      clientSecret: appConfig.githubClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      await connectDB();

      const existingUser = await User.findOne({
        providerId: account.providerAccountId,
      });

      if (!existingUser) {
        // Create user for any provider
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider, // "github" or "google"
          providerId: account.providerAccountId, // Unique ID from GitHub/Google
        });
      }

      return true; // Allow sign-in
    },
    async session({ session }: any) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id; // Attach MongoDB user ID to session
      }

      return session;
    },
  },
  secret: appConfig.authSecret,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
