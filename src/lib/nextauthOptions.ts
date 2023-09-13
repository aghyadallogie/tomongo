import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "./mongodb";

export const nextauthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email.toLowerCase();
        const password = credentials?.password as string;
        await connectMongoDB();

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) throw new Error("User does not exist with those credentials!");

        //validate password
        const passwordIsValid = await user.comparePassword(password);
        if (!passwordIsValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          ...user,
        };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
};
