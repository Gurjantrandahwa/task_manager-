"use client"

import React from 'react';
import {useTodos} from "../store/todos";
import {AiFillDelete} from "react-icons/ai";
import {useSearchParams} from "next/navigation";

const TodoList = () => {
    const {todos, handleDeleteTodo, todoAsCompleted} = useTodos();
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos')


    let filterTodos = todos;

    if (todosFilter === "progress") {
        filterTodos = filterTodos.filter((todo) => !todo.completed)

    } else if (todosFilter === "completed") {
        filterTodos = filterTodos.filter((todo) => todo.completed)
    }

    return <ul className={"divide-y divide-blue-500"}>
        {filterTodos.map((todo) => {
            return <li key={todo.id} className={"main-task flex items-start justify-between py-4"}>
                <div className={"flex gap-5 items-start"}>
                    <input className={"cursor-pointer h-4 w-4 mt-1"}
                           type="checkbox"
                           name={""}
                           id={`todo-${todo.id}`}
                           checked={todo.completed}
                           onChange={() => todoAsCompleted(todo.id)}
                           autoComplete={false}
                    />

                    <label htmlFor={`todo-${todo.id}`}
                           className={"font-bold text-base text-blue-500"}>
                        {todo.task}
                    </label>
                </div>


                {
                    todo.completed && (

                        <button className={"text-red-500"}
                                type={"button"} onClick={() => handleDeleteTodo(todo.id)}>
                            <AiFillDelete size={20}/>
                        </button>
                    )
                }
            </li>
        })}
    </ul>
};

export default TodoList;