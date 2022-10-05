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
    <div className="container flex flex-col h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">Workspace</h1>
      <button
        className="bg-slate-50 p-2 border-2 "
        onClick={() => addNewWorkspace()}
      >
        Add New Empty Workspace to my profile
      </button>
    </div>
  );
}
