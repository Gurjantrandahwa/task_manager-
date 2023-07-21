"use client"

import React, {useState} from 'react';
import {useTodos} from "../store/todos";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {useSearchParams} from "next/navigation";
import {FaSave} from "react-icons/fa";

const TodoList = () => {
    const {todos, handleDeleteTodo, todoAsCompleted, handleEditTodo} = useTodos();
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');

    const [editedTodoId, setEditedTodoId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState('');

    const handleEditInputChange = (event) => {
        setUpdatedTask(event.target.value);
    };

    let filterTodos = todos;

    if (todosFilter === "progress") {
        filterTodos = filterTodos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
        filterTodos = filterTodos.filter((todo) => todo.completed);
    }

    return <ul>

        {filterTodos.map((todo) => {
            const isEdited = editedTodoId === todo.id;

            return <li key={todo.id} className={"main-task flex justify-between mb-4 mt-4"}>
                <div className={"flex flex-1 gap-2 items-center"}>
                    <input
                        className={"w-[18px] h-[18px]"}
                        type="checkbox"
                        name={""}
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => todoAsCompleted(todo.id)}
                    />
                    {isEdited ? (

                        <input
                            className={"border border-blue-500 outline-blue-500 rounded py-1 px-2 w-full mx-4"}
                            type="text"
                            value={updatedTask}
                            onChange={handleEditInputChange}

                        />

                    ) : (
                        <label htmlFor={`todo-${todo.id}`}
                        className={"font-semibold text-lg"}
                        >
                            {todo.task}
                        </label>
                    )}
                </div>
                <div className={"flex gap-2"}>
                    {isEdited ? (
                        <button
                            type={"button"}
                            className={"text-green-600"}
                            onClick={() => {
                                handleEditTodo(todo.id, updatedTask);
                                setEditedTodoId(null);
                            }}
                        >
                            <FaSave  size={20}/>
                        </button>
                    ) : (
                        <button
                            className={"text-blue-500"}
                            onClick={() => {
                                setEditedTodoId(todo.id);
                                setUpdatedTask(todo.task);
                            }}
                        >
                            <AiFillEdit size={20} />
                        </button>
                    )}
                    {todo.completed && (
                        <button

                            type={"button"}
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            <AiFillDelete size={20} className={"text-red-500"}/>
                        </button>
                    )}
                </div>
            </li>
        })}
    </ul>
};

export default TodoList;
