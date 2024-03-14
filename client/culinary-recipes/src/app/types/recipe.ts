import { User } from './user';

export interface Recipe {
  _id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  ownerId: User;
}
