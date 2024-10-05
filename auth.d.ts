import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * The shape of the returned object in the OAuth providers' `profile` callback,
   * available in the `jwt` and `session` callbacks,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    passwordHash?: string | null;
  }

  /**
   * Returned by `useSession`, `auth`, contains information
   * about the active session of the logged in user.
   */
  interface Session extends DefaultSession {
    user?: User;
  }
}
