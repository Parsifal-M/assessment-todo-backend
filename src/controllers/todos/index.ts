import { Request, Response } from 'express';
import { ITodo } from '../../types/todo';
import Todo from '../../models/todo';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: Todo[] = await Todo.findAll();
    const todosJSON: ITodo[] = todos.map((todo: Todo) => todo.toJSON() as ITodo);
    res.status(200).json({ todos: todosJSON });
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, 'title' | 'description' | 'status'>;
        const todo: ITodo = {
            title: body.title,
            description: body.description,
            status: body.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 0
        };
        const newTodo: Todo = await Todo.create(todo);
        const newTodoJSON: ITodo = newTodo.toJSON() as ITodo;
        res.status(201).json({ todo: newTodoJSON });
    } catch (error) {
        throw error;
    }
};


export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId: string = req.params.id;
      const body = req.body as Pick<ITodo, 'title' | 'description' | 'status'>;
      const todo: ITodo = {
        title: body.title,
        description: body.description,
        status: body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 0
      };
      const [updatedRows, [updatedTodo]] = await Todo.update(todo, {
        where: { id: Number(todoId) },
        returning: true,
      });
      res.status(200).json({
        message: 'Todo updated',
        updatedRows,
        todo: updatedTodo.toJSON(),
      });
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId: string = req.params.id;
      const deletedTodo: number = await Todo.destroy({
        where: { id: Number(todoId) },
      });
      res.status(200).json({
        message: 'Todo deleted',
        deletedTodo,
      });
    } catch (error) {
      throw error;
    }
  };