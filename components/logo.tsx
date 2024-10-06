import Image from 'next/image';

export function Logo() {
  return (
    <Image
      className="dark:invert h-5 w-auto select-none"
      src="https://nextjs.org/icons/next.svg"
      alt="Next.js logo"
      width={0}
      height={0}
      priority
    />
  );
}
