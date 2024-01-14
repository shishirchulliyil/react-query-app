import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/common";
import { ChangeEvent, useState } from "react";

const Todo = () => {
  const todosIdQuery = useTodosIds();
  const todosQuery = useTodos(todosIdQuery.data);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [newTodo, setNewTodo] = useState<Todo>({
    id: Math.ceil(Math.random() * 10000),
    title: "",
    description: "",
    checked: false,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnCreateTodo = () => {
    createTodoMutation.mutate({
      id: newTodo.id!,
      title: newTodo.title!,
      description: newTodo.description!,
      checked: newTodo.checked!,
    });

    setNewTodo({
      id: Math.ceil(Math.random() * 10000),
      title: "",
      description: "",
      checked: false,
    });
  };

  const handleOnCheck = (todo: Todo) => {
    updateTodoMutation.mutate({ ...todo, checked: true });
  };

  const handleOnDelete = (todo: Todo) => {
    deleteTodoMutation.mutate(todo);
  };

  if (todosIdQuery.isPending) return <p> Loading ...</p>;
  if (todosIdQuery.isError) return <p> Error </p>;
  return (
    <div>
      {/* <p>Query Fetching Status: {todosIdQuery.status}</p>
      {todosIdQuery.data.map((id) => (
        <p key={id}>id: {id}</p>
      ))} */}
      <div>
        <input
          placeholder='Title'
          value={newTodo.title}
          name='title'
          onChange={handleOnChange}
        />
        <input
          placeholder='Description'
          value={newTodo.description}
          name='description'
          onChange={handleOnChange}
        />
        <button
          onClick={handleOnCreateTodo}
          disabled={createTodoMutation.isPending}
        >
          {createTodoMutation.isPending ? "Saving" : "Create Todo"}
        </button>
      </div>
      <div>
        <ul>
          {todosQuery.map(({ data }) => (
            <li key={data?.id}>
              <span style={{ display: "block" }}>id: {data?.id}</span>
              <span style={{ display: "block" }}>title: {data?.title}</span>
              <span style={{ display: "block" }}>
                desc: {data?.description}
              </span>
              <button
                onClick={() => handleOnCheck(data!)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              <button onClick={() => handleOnDelete(data!)}>Delete</button>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
