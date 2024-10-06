import { Footer } from '@/components/footer';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)] w-full overflow-y-auto">
      <div className="flex flex-col rounded-md bg-neutral-100 dark:bg-neutral-800">
        <div className="rounded-t-md bg-neutral-200 dark:bg-neutral-900 p-4 font-bold">
          Current Session
        </div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <Footer />
    </div>
  );
}
