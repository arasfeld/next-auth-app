import { redirect } from 'next/navigation';

import { RegisterForm } from '@/components/register-form';
import { auth } from '@/lib/auth';

export default async function Register() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <RegisterForm />;
}
