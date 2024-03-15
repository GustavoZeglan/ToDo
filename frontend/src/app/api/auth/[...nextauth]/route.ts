import { nextAuthOptions } from "@/app/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };


// const response = await fetch("http://localhost:5000/login", {
//                     method: "POST",
//                     headers: {
//                         "Content-type": "application/json"
//                     },
//                     body: JSON.stringify({ email: credentials?.email, password: credentials?.password, })
//                 }).catch(err => {
//                     throw new Error(err);
//                 });

//                 const user = await response?.json();

//                 if (user && response?.ok) {
//                     return user;
//                 } 