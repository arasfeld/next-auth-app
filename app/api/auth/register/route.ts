import { hash } from 'argon2';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  if (!email || !password) {
    throw new Error('Invalid arguments.');
  }

  // hash the password with argon2
  const passwordHash = await hash(password);

  // create the user
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  // create the credentials account
  const account = await prisma.account.create({
    data: {
      provider: 'credentials',
      providerAccountId: user.id,
      type: 'credentials',
      userId: user.id,
    },
  });

  if (!user || !account) {
    throw new Error('Error creating user.');
  }

  return Response.json({ user, account });
}
