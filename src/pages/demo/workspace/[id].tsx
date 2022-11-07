import { useSession } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { getWorkspaceById } from 'controllers/workspaceController';
import { useState } from 'react';

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

  if (!workspaceState) {
    return (
      <div>
        <h1>Workspace not found</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>User Info</h1>
        <button onClick={() => console.log(session?.user)}>
          Print My User Session
        </button>
        <button onClick={() => console.log(workspaceState)}>
          Print This Workspace
        </button>
      </div>
    );
  }
}
