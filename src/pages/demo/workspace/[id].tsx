import { useSession } from 'next-auth/react';
import { AppSession } from 'models/global';
import { getWorkspaceById } from 'controllers/workspaceController';
import { useState } from 'react';
import axios from 'axios';

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

  const addBoardToWorkspace = async () => {
    const newBoard = {
      title: 'Cool Beans',
      description: 'This is a new board',
      workspace_id: workspaceState._id,
    };
    try {
      const res = await axios.post('/api/workspace/board', newBoard);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
        <button onClick={addBoardToWorkspace}>Add Board To Workspace</button>
      </div>
    );
  }
}
