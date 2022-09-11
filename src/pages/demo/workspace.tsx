import { v4 } from 'uuid';
import axios from 'axios';
import { IWorkspace } from '../../../models/global.types';

export default function Workspace() {
  const addNewWorkspace = () => {
    const newWorkspace: IWorkspace = {
      _id: v4(),
      name: 'New Workspace',
      description: 'New Workspace Description',
      users: [],
      boards: [],
    };

    axios.post('/api/workspace', newWorkspace);
    axios.post('/api/user/workspace', { workspace_id: newWorkspace._id });
  };

  return (
    <div className="container flex flex-col h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">Workspace</h1>
      <button className="bg-slate-50 p-2 border-2 ">
        Add New Empty Workspace to my profile
      </button>
    </div>
  );
}
