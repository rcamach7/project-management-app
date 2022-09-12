import { Session } from 'next-auth';

export interface IUser {
  _id: string;
  image: string;
  name: string;
  email: string;
  emailVerified: boolean;
  workspaces?: IWorkspace[];
}

export interface IWorkspace {
  _id: string;
  name: string;
  description: string;
  users: IUser[];
  boards: IBoard[];
}

export interface SWorkspace {
  _id: string;
  name: string;
  description: string;
  users: string[];
  boards: IBoard[];
}

export interface IBoard {
  _id: string;
  title: string;
  description: string;
  cards: ICard[];
}

export interface ICard {
  _id: string;
  title: string;
  description: string;
  comments: IComment[];
  labels: LabelsEnum[];
}

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
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

export interface AppSession extends Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    _id?: string;
    workspaces?: IWorkspace[];
  };
}
