export interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
  emailVerified: boolean;
  workspaces?: Workspace[];
}

export interface Workspace {
  _id: string;
  name: string;
  description: string;
  owner: User;
  users: User[];
  boards: Board[];
}

export interface Board {
  _id: string;
  workspace_id: string;
  title: string;
  description: string;
  tickets: Ticket[];
}

export interface Ticket {
  _id: string;
  board_id: string;
  title: string;
  description: string;
  labels: LabelsEnum[];
}

export enum LabelsEnum {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  FEAT = 'FEAT',
  REFACTOR = 'REFACTOR',
  TEST = 'TEST',
  PERF = 'PERF',
  STYLE = 'STYLE',
  ASSET = 'ASSET',
  DOC = 'DOC',
  CI = 'CI',
  CHORE = 'CHORE',
  WIP = 'WIP',
}

export interface Feature {
  image: string;
  title: string;
  description: string;
}
