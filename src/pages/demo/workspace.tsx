import { useSession } from 'next-auth/react';
import { AppSession } from '../../../models/global.types';
import axios from 'axios';

export default function Workspace() {
  const { data: session }: { data: AppSession } = useSession();

  const addNewWorkspace = async () => {
    if (!session) return;

    try {
      const newWorkspace = await axios.post('/api/workspace', {
        name: 'Cool Workspace Project',
        description: 'This is a cool workspace project description',
      });

      console.log(newWorkspace);
    } catch (error) {
      console.error("Couldn't create workspace", error);
    }
  };

  return (
    <div className="container flex flex-col h-screen justify-center items-center gap-3">
      <h1 className="text-4xl font-bold">Workspace Demo</h1>

      <button
        className="bg-slate-500 p-1"
        onClick={() => console.log(session.user.workspaces)}
      >
        Print My Workspaces
      </button>

      <button className="bg-slate-500 p-1" onClick={() => addNewWorkspace()}>
        Add New Empty Workspace to my profile
      </button>
    </div>
  );
}
