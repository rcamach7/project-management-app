import { Session } from 'next-auth';
export interface WorkspaceSummary {
  _id: string;
  name: string;
  description: string;
  users: [{ _id: string; name: string; image: string }];
  owner: { _id: string; name: string; image: string };
}

export interface AppSession extends Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    _id?: string;
    workspaces?: WorkspaceSummary[];
  };
}
