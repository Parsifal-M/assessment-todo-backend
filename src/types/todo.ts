import { Model } from 'sequelize';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoModel extends Model<ITodo>, ITodo {}
