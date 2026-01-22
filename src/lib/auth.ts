import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        try {
          const result = await sql`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;

          const user = result.rows[0];

          if (!user || !user.password) {
            throw new Error('Utilisateur non trouvé');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Erreur d\'authentification');
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists
        const existingUser = await sql`
          SELECT * FROM users WHERE email = ${user.email}
        `;

        let userId: number;

        if (existingUser.rows.length === 0) {
          // Create new user
          const newUser = await sql`
            INSERT INTO users (email, name, image, provider)
            VALUES (${user.email}, ${user.name}, ${user.image}, ${account?.provider || 'credentials'})
            RETURNING id
          `;
          userId = newUser.rows[0].id;

          // Initialize user progress
          await sql`
            INSERT INTO user_progress (user_id, total_xp, streak, last_activity_date)
            VALUES (${userId}, 0, 0, CURRENT_DATE)
          `;
        } else {
          userId = existingUser.rows[0].id;
        }

        // Store OAuth account info if applicable
        if (account && account.provider !== 'credentials') {
          await sql`
            INSERT INTO accounts (
              user_id, type, provider, provider_account_id,
              access_token, refresh_token, expires_at, token_type, scope, id_token
            )
            VALUES (
              ${userId}, ${account.type}, ${account.provider}, ${account.providerAccountId},
              ${account.access_token}, ${account.refresh_token}, ${account.expires_at},
              ${account.token_type}, ${account.scope}, ${account.id_token}
            )
            ON CONFLICT (provider, provider_account_id) DO NOTHING
          `;
        }

        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
