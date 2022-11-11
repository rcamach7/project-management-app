import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';

export default function Me({ mySession }) {
  const { user }: AppSession = JSON.parse(mySession);

  return 'User is logged in';
}

export async function getServerSideProps({ req, res }) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const mySession = JSON.stringify(session);
    return {
      props: {
        mySession,
      },
    };
  }
}
