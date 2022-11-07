import { useSession } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { reloadSession } from '@/lib/clientSesstion';
import Link from 'next/link';
import axios from 'axios';

export default function Workspace() {
  const { data: session }: { data: AppSession } = useSession();

  const addNewWorkspace = async () => {
    if (!session) return;

    try {
      const { data: workspace } = await axios.post('/api/workspace', {
        name: 'Cool Workspace Project',
        description: 'This is a cool workspace project description',
      });
      reloadSession();
      console.log(workspace);
    } catch (error) {
      console.error("Couldn't create workspace", error);
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    if (!session) return;

    try {
      const res = await axios.delete('/api/user/', {
        data: { _id: workspaceId },
      });
      reloadSession();
      console.log(res);
    } catch (error) {
      console.error("Couldn't delete workspace", error);
    }
  };

  const updateWorkspaceDetails = async (
    workspaceId: string,
    fields: { name: string; description: string }
  ) => {
    if (!session) return;

    try {
      const res = await axios.put('/api/workspace/', {
        _id: workspaceId,
        ...fields,
      });
      reloadSession();
      console.log(res);
    } catch (error) {
      console.error("Couldn't delete workspace", error);
    }
  };

  const deleteEntireWorkspace = async (workspaceId: string) => {
    if (!session) return;

    try {
      const res = await axios.delete('/api/workspace/', {
        data: { _id: workspaceId },
      });
      reloadSession();
      console.log(res);
    } catch (error) {
      console.error("Couldn't delete workspace", error);
    }
  };

  return (
    <div>
      <h1>Log Info</h1>
      <button onClick={() => console.log(session?.user)}>
        Print My Session
      </button>
      <button onClick={() => console.log(session.user.workspaces)}>
        Print My Workspaces
      </button>

      <h1>Workspace CRUD</h1>
      <button onClick={() => addNewWorkspace()}>Add New Empty Workspace</button>
      <button onClick={() => deleteWorkspace('634091a4e199a84ab6a06b59')}>
        Delete specific workspace
      </button>

      <button
        onClick={() =>
          updateWorkspaceDetails('6340959ae199a84ab6a06b6d', {
            name: 'New name',
            description: 'New Description',
          })
        }
      >
        Update Workspace General Info (title and description)
      </button>
      <button onClick={() => deleteEntireWorkspace('6340959ae199a84ab6a06b6d')}>
        Delete Entire Workspace
      </button>

      <h1>Visit Workspaces</h1>
      {session?.user.workspaces.map((workspace) => (
        <Link key={workspace._id} href={`workspace/${workspace._id}`}>
          <span>{workspace.name}</span>
        </Link>
      ))}
    </div>
  );
}
