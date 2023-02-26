import { Model } from 'sequelize';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoModel extends Model<ITodo>, ITodo {}
