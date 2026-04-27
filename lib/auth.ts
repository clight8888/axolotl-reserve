import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAxolotlByBuyerEmail } from './data'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'buyer',
      name: 'Buyer Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        const axolotl = getAxolotlByBuyerEmail(credentials.email)
        if (axolotl) {
          return {
            id: credentials.email,
            email: credentials.email,
            name: axolotl.buyerName ?? credentials.email,
            role: 'buyer',
            axolotlId: axolotl.id,
          } as any
        }
        return null
      },
    }),
    CredentialsProvider({
      id: 'admin',
      name: 'Admin Login',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: 'admin',
            email: 'admin@axolotl-reserve.com',
            name: 'Admin',
            role: 'admin',
          } as any
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.axolotlId = (user as any).axolotlId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).axolotlId = token.axolotlId
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/dashboard',
    error: '/dashboard',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
