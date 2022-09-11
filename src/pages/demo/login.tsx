import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <h1 className="container flex flex-col justify-center items-center w-screen h-screen">
      {session && (
        <>
          <p className="text-3xl">Hello {session.user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
      {!session && (
        <>
          <p>Not Signed In</p>

          <button className="" onClick={() => signIn()}>
            Sign In
          </button>
        </>
      )}
    </h1>
  );
}
