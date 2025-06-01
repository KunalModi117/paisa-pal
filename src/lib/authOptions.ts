import { connectDB } from "@pal/lib/mongodb";
import { User } from "@pal/models/user";
import { appConfig } from "@pal/utils/appconfig";
import Github from "next-auth/providers/github";
import { AnyType } from "../../type";

export const authOptions = {
  providers: [
    Github({
      clientId: appConfig.githubClientId,
      clientSecret: appConfig.githubClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: AnyType) {
      await connectDB();

      const existingUser = await User.findOne({
        providerId: account.providerAccountId,
      });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          providerId: account.providerAccountId,
        });
      }

      return true;
    },
    async session({ session }: AnyType) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id;
      }

      return session;
    },
  },
  secret: appConfig.authSecret,
};
