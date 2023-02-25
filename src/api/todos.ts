import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function fetchTodos() {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
}

export async function createTodo({ title, completed }: { title: string; completed: boolean }) {
  const response = await axios.post(`${BASE_URL}/todos`, { title, completed });
  return response.data;
}

export async function updateTodo(
  id: number,
  { title, completed }: { title: string; completed: boolean }
) {
  const response = await axios.put(`${BASE_URL}/todos/${id}`, { title, completed });
  return response.data;
}

export async function deleteTodo(id: number) {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  return response.data;
}
