import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth';

export function LoginForm() {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    try {
      const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      };

      await signIn('credentials', rawFormData);

      redirect('/');
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              error: true,
              message: 'Invalid email or password',
            };
          default:
            return {
              error: true,
              message: error.message,
            };
        }
      }

      throw error;
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="email"
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                autoComplete="current-password"
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>

        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
          className="pt-4"
        >
          <Button type="submit" className="w-full" variant="outline">
            Login with Google
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
