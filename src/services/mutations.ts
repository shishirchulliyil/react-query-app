import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/common";
import { createTodo, deleteTodo, updateTodo } from "./api";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) => createTodo(todo),
        onMutate: () => {
            console.log("onMutate called just before mutation!")
        },

        onError: () => {
            console.log("error!")
        },

        onSuccess: () => {
            console.log("if mutation successful => print this!")
        },

        onSettled: async (_, error) => {
            console.log("after the mutation process is completed => print this!");
            if(error) {
                console.log("Error!");
            }
            else {
                await queryClient.invalidateQueries({
                    queryKey: ["todos"]
                })
            }
        }
    })
}

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) => updateTodo(todo),
        onSettled: async (_, error, variables) => {
            console.log("after the mutation process is completed => print this!");
            if(error) {
                console.log("Error!");
            }
            else {
                await queryClient.invalidateQueries({
                    queryKey: ["todos"]
                })
                await queryClient.invalidateQueries({
                    queryKey: ["todo", { id: variables.id }]
                })
            }
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => deleteTodo(todo),
        onSettled: async (_, error) => {
            console.log("after the mutation process is completed => print this!");
            if(error) {
                console.log("Error!");
            }
            else {
                await queryClient.invalidateQueries({
                    queryKey: ["todos"]
                })
            }
        }
    })
}