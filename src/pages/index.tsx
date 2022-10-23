import Link from 'next/link';

export default function Home() {
  return (
    <h1 className="container flex flex-col justify-center items-center w-screen h-screen">
      <p className="text-3xl">Hello World</p>

      <p className="mt-3">Demo Links</p>
      <ul className="flex flex-col gap-1">
        <li className="bg-slate-600">
          <Link href="demo/login">demo/login</Link>
        </li>
        <li className="bg-slate-600">
          <Link href="demo/workspace">demo/workspace</Link>
        </li>
      </ul>
    </h1>
  );
}
