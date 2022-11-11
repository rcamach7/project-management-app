import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { useEffect } from 'react';
import { useAppSelector } from '@/features/index';

export default function Me({ mySession }) {
  const { user } = JSON.parse(mySession);
  const { value, loading } = useAppSelector((state) => state.workspaces);

  useEffect(() => {
    console.log(loading);
    console.log(value);
    console.log(user);
  }, [loading, value, user]);

  return 'User is logged in';
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const mySession = JSON.stringify(session);
  return {
    props: {
      mySession,
    },
  };
}
