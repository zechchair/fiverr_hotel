import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
           
            if (
              credentials?.username == "admin" &&
              credentials?.password == "admin"
            ) {
              return { id: "1", role: "admin", name: "admin",username:"admin", }
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],
      callbacks: {
        // async signIn({ account, profile }) {
        // 	if (account.provider === "google") {
        // 		return profile.email_verified && profile.email.endsWith("@gmail.com")
        // 	} else {
        // 		console.log(account)
        // 		console.log(profile)
        // 	}
    
        // 	return true // Do different verification for other providers that don't have `email_verified`
        // },
        async jwt({ token, account, user, isNewUser, session }) {
          if (account) {
            token.role = user?.role
            token.id = user?.id
          }
          return token
        },
        async session({ session, token, user }) {
          // session.user = { ...session.user, role: user?.role, id: user?.id, resto: user?.resto?.name }
          session.user = {
            ...session.user,
            image:"ui",
            email:"mail",
            role: token?.role,
            id: token?.id,
          }
    
          const now = new Date()
          // if (token.id) {
          //   await prisma.user.update({
          //     where: {
          //       id: token?.id,
          //     },
          //     data: { connected: true, lastConnection: now },
          //   })
          // }
    
          return session
        },
        // redirect({ url, baseUrl }) {
        // 	if (url.startsWith(baseUrl)) return url
        // 	else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        // 	return baseUrl
        // },
      },
      session: {
        // Seconds - How long until an idle session expires and is no longer valid.
        // strategy: "database",
    
        maxAge: 30 * 60 * 60, // 30 days
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
      },
    
      // secret: "secrets",
      pages: {
        // signIn: "/auth/login",
        // signOut: "/partner",
        // error: "/auth/login", // Error code passed in query string as ?error=
        // verifyRequest: "/auth/verify-request", // (used for check email message)
        // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
      },
}
export default NextAuth(authOptions)