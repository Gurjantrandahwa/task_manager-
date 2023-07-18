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

    return <ul className={""}>


        {filterTodos.map((todo) => {
            return <li key={todo.id} className={"main-task"}>


                    <input className={"cursor-pointer"}
                           type="checkbox"
                           name={""}
                           id={`todo-${todo.id}`}
                           checked={todo.completed}
                           onChange={() => todoAsCompleted(todo.id)}
                    />

                    <label htmlFor={`todo-${todo.id}`}
                           className={"font-bold text-base text-blue-500"}>
                        {todo.task}
                    </label>


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