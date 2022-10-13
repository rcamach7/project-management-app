import { useSession } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { reloadSession } from '@/lib/clientSesstion';
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

  return (
    <div className="container flex flex-col h-screen justify-center items-center gap-3">
      <h1 className="text-4xl font-bold">Log Info</h1>
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

      <h1 className="text-4xl font-bold">Workspace CRUD</h1>
      <button className="bg-slate-500 p-1" onClick={() => addNewWorkspace()}>
        Add New Empty Workspace
      </button>
      <button
        className="bg-slate-500 p-1"
        onClick={() => deleteWorkspace('634091a4e199a84ab6a06b59')}
      >
        Delete specific workspace
      </button>
    </div>
  );
}
