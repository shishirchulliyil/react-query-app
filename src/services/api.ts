import axios from "axios";
import { Product, Project, Todo } from "../types/common";

const BASE_URL = "http://localhost:8080/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) =>
    Number(todo.id)
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (todo: Todo) => {
  await axiosInstance.post("todos", todo);
};

export const updateTodo = async (todo: Todo) => {
  await axiosInstance.put(`todos/${todo.id}`, todo);
};

export const deleteTodo = async (todo: Todo) => {
  await axiosInstance.delete(`todos/${todo.id}`);
};

// Pagination :: uses _page and _limit
export const getProjects = async (page = 1) => {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};

// Infinite Scroll :: uses pageParam, _page and _limit
export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
