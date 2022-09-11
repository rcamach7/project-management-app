export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  workspaces: IWorkspace[];
}

export interface IWorkspace {
  name: string;
  description: string;
  users: IUser[];
  boards: IBoard[];
}

export interface IBoard {
  title: string;
  description: string;
  cards: ICard[];
}

export interface ICard {
  title: string;
  description: string;
  comments: IComment[];
  labels: LabelsEnum[];
}

export interface IComment {
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
