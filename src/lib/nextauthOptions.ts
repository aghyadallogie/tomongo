import User from "@/models/UserModel";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "./mongodb";

export const nextauthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username or Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your secure password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.username.toLowerCase();
        const password = credentials?.password as string;
        await connectMongoDB();

        //check if user exists
        const user = await User.findOne({ email });
        // if (!user)
        //   throw new Error("User does not exist with those credentials!");
        console.log('userrrr', user);
        
        //validate password
        // const passwordIsValid = await user.comparePassword(password);
        // if (!passwordIsValid) throw new Error("Invalid credentials");

        return {
          id: user?._id.toString(),
          name: user?.username,
          email: user?.email,
        };

        //   const user = { id: "0", name: "dave", password: "nextauth" };
        //   if (
        //     credentials?.username === user.name &&
        //     credentials?.password === user.password
        //   ) {
        //     return user;
        //   } else {
        //     return null;
        //   }
      },
    }),
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '../'
  // }
  // callbacks: {
  //   jwt(params: any) {
  //     console.log("loglog", params.user._doc);

  //     if (params.user._id) {
  //       params.token.id = params.user._id;
  //     }
  //     return params.token;
  //   },
  //   session({ session, token }) {
  //     console.log("sesh sesh", session);
  //     console.log("token token", token);

  //     if (session.user) {
  //       (session.user as { id: string }).id = token.id as string;
  //       // session.token.id = session.user.id
  //     }
  //     return session;
  //   },
  // },
};

export const getAuthSession = () => getServerSession(nextauthOptions);
