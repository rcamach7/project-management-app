import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function Me({ mySession }) {
  const { user } = JSON.parse(mySession);

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
