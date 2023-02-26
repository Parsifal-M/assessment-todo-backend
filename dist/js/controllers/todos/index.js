"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.findAll();
        const todosJSON = todos.map((todo) => todo.toJSON());
        res.status(200).json({ todos: todosJSON });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = {
            title: body.title,
            description: body.description,
            status: body.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: body.id,
        };
        const newTodo = yield todo_1.default.create(todo);
        const newTodoJSON = newTodo.toJSON();
        res.status(201).json({ todo: newTodoJSON });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const body = req.body;
        const todo = {
            title: body.title,
            description: body.description,
            status: body.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 0
        };
        const [updatedRows, [updatedTodo]] = yield todo_1.default.update(todo, {
            where: { id: Number(todoId) },
            returning: true,
        });
        res.status(200).json({
            message: 'Todo updated',
            updatedRows,
            todo: updatedTodo.toJSON(),
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const deletedTodo = yield todo_1.default.destroy({
            where: { id: Number(todoId) },
        });
        res.status(200).json({
            message: 'Todo deleted',
            deletedTodo,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
