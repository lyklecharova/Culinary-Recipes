import { User } from './user';

export interface Recipe {
  _id: string;
  title: string;
  image: string;
  url: string;
  ownerId: User;
}
