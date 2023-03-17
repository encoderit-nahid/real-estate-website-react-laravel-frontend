import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
// import Providers from "next-auth/providers";
// import axios from "axios";

// import { server } from "../../../config";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
       
            async authorize(credentials, req) {
                console.log(credentials.token)
                const config = {
                    headers: { Authorization: `Bearer ${credentials.token}` }
                  };
                  axios.get('http://127.0.0.1:8000/api/auth-user', config)
                    .then(({ data: isData }) => {
                      console.log("isDatataa",isData);
                   
                    })
                    .catch(error => {
                      console.log(error);
                  
                    });
                // return {
                //     name: credentials.name,
                //     email: credentials.email,
                //     remember: credentials.remember,
                //     record_id: credentials.record_id,

                //     myCustomFieldData: credentials.myCustomFieldData,
                //     fname: credentials.fname,
                // };
                return {
                    user : "saad",
                    token: credentials.token
                }
            },
        }),
    ],

    secret: "43|pCAjrzeP7T23YRdve299bneHQORwChnx61cMcAXp",
    // jwt: {
    //     secret: process.env.JWT_SECRET,
    // },
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // // Seconds - Throttle how frequently to write to database to extend a session.
        // // Use it to limit write operations. Set to 0 to always update the database.
        // // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },
   
    callbacks: {
        // async redirect({url, baseUrl}) {
        //     // console.log("REDIRECT", url, baseUrl);
        //     return baseUrl;
        // },
        async session({session, token}) {
            if (token) {
                session.user = token.user;
              
            }
            console.log("SESSION", session, "TOKEN", token);
            return session;
        },
        async jwt({token, user, account, profile, isNewUser}) {
            console.log({user})
            // Initial sign in
            if (account && user) {
                // token.remember = Boolean(user.remember);
                // token.record_id = parseInt(user.record_id);
                // token.fname = user.fname;
                // token.myCustomFieldData = user.myCustomFieldData;
                token.user = user
            }
            return token;
        },
    },

    pages: {
        signIn: "/",
      },
      session: {
        strategy: "jwt",
      },
});
