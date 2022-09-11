export interface User {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  workspaces: Workspaces[];
}

export interface Workspaces {
  name: string;
  description: string;
  users: User[];
  boards: Board[];
}

export interface Board {
  title: string;
  description: string;
  cards: Card[];
}

export interface Card {
  title: string;
  description: string;
  comments: Comment[];
  labels: LabelsEnum[];
}

export interface Comment {
  user: User;
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
