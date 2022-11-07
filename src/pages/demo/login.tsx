import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  return (
    <h1>
      {session && (
        <>
          <p>Hello {session.user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
      {!session && (
        <>
          <p>Not Signed In</p>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </h1>
  );
}
