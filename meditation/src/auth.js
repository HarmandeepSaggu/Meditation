import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('Sending credentials to backend:', credentials);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        console.log('Response from backend:', data);

        if (!res.ok) {
          throw new CredentialsSignin(data.message || 'Invalid credentials');
        }

        return data.user; // Make sure user contains: _id, email, name, role
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // ✅ Add role
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role, // ✅ Include role in session
      };
      return session;
    },
  },
});
