import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const backendUrl =
            process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";
          const res = await fetch(
            `${backendUrl}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const response = await res.json();

          if (!res.ok) {
            throw new Error(response?.message || "Login failed");
          }

          // Safely get user object
          const user = response.data?.user || response.data || response.user;
          if (!user) throw new Error("User data not found");

          // Access token could be inside response.data.accessToken or response.token
          const accessToken =
            response.data?.accessToken ||
            response.data?.token ||
            response.accessToken ||
            response.token ||
            null;

          return {
            id: user._id || user.id,
            name: user.fullName || user.name || user.email?.split("@")[0],
            email: user.email,
            phoneNumber: user.phoneNumber || null,
            role: user.role,
            profileImage: user.profileImage || null,
            accessToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          const message =
            error instanceof Error ? error.message : "Authentication failed";
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        phoneNumber: token.phoneNumber,
        role: token.role,
        profileImage: token.profileImage,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};