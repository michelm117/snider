import { UserInterface } from './user.interfaces';

export interface NoteInterface {
  id: number;
  name: string;
  created_at: Date;
  note: string;
  user: UserInterface;
}

export interface NoteInfoInterface {
  id: number;
  name: string;
}
