import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    userToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userToken: string;
  }
}
