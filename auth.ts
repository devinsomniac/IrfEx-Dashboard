import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

const allowedUsers = [
    "inzamamchowdhury20@gmail.com",
    "developer.insoniac@gmail.com",
    "irfansifat@gmail.com",
    "rozysultana1977@gmail.com",
    "rozysultana19777@gmail.com",
    "chowdhuryirfan36@gmail.com",
    "mdjahidhossain268329@gmail.com"
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (user.email && allowedUsers.includes(user.email)) {
        return true; 
      } else {
        throw new Error("Unauthorized"); 
      }
    },
  },
  pages: {
    error: "/access", 
  },
});
