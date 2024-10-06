import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/login-form';
import { auth } from '@/lib/auth';

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center w-full">
      <LoginForm />
    </div>
  );
}
