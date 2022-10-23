import { useSession } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { getWorkspaceById } from 'controllers/workspaceController';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
  const { id } = context.query;

  let workspace;
  try {
    workspace = await getWorkspaceById(id);
  } catch (error) {
    workspace = null;
    console.error(error);
  }

  return {
    props: {
      workspace: JSON.stringify(workspace),
    },
  };
}

export default function Workspace_Continued({ workspace }) {
  const { data: session }: { data: AppSession } = useSession();
  const [workspaceState, setWorkspaceState] = useState(JSON.parse(workspace));

  useEffect(() => {
    console.log(workspaceState);
  }, [workspaceState]);

  if (!workspaceState) {
    return (
      <div className="container flex flex-col h-screen justify-center items-center gap-3">
        <h1 className="text-4xl font-bold">Workspace not found</h1>
      </div>
    );
  } else {
    return (
      <div className="container flex flex-col h-screen justify-center items-center gap-3">
        <h1 className="text-4xl font-bold">User Info</h1>
        <button
          className="bg-slate-500 p-1"
          onClick={() => console.log(session?.user)}
        >
          Print My Session
        </button>
        <button
          className="bg-slate-500 p-1"
          onClick={() => console.log(session.user.workspaces)}
        >
          Print My Workspaces
        </button>
      </div>
    );
  }
}
