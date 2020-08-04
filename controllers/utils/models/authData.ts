import { User } from './user.ts';

export interface AuthData {
  user: User;
  token: string;
}
