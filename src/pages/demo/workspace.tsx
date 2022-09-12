import { IWorkspace } from '../../../models/global.types';
import { useSession } from 'next-auth/react';
import { AppSession } from '../../../models/global.types';
import { v4 } from 'uuid';
import axios from 'axios';

export default function Workspace() {
  const { data: session }: { data: AppSession } = useSession();

  const addNewWorkspace = async () => {
    if (!session) return;

    const bodyFields = {
      name: 'New Workspace',
      description: 'New Workspace Description',
    };

    const newWorkspace: IWorkspace = await axios.post(
      '/api/workspace',
      bodyFields
    );

    console.log(newWorkspace);
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
