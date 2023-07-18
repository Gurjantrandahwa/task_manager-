"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";

export type Todo = {
    id: string,
    task: string,
    completed: boolean,
    createdAt: Date
};
export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void; //call signature
    todoAsCompleted: (task: string) => void;
    handleDeleteTodo: (task: string) => void;
}
export const todosContext = createContext<TodosContext | null>(null)


export const TodosProvider = ({children}: { children: ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("newTasks");
        if (storedTasks) {
            setTodos(JSON.parse(storedTasks));
        }
    }, []);

    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("newTasks", JSON.stringify(newTodos))
            return newTodos;
        })

    }
    const todoAsCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return {...task, completed: !task.completed}
                }
                return task;
            })
            localStorage.setItem("newTasks", JSON.stringify(newTodos))
            return newTodos;

        })

    }
    const handleDeleteTodo = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id);
            localStorage.setItem("newTasks", JSON.stringify(newTodos))
            return newTodos;
        })
    }
    return <todosContext.Provider value={{todos, handleAddTodo, todoAsCompleted, handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("UseTodos used outside the Provider")
    }
    return todosContextValue;
}