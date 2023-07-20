import React from "react";
import FilterNavbar from "./FilterNavbar";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function ToDo() {
    return <div
        className={"flex flex-col gap-4 mx-auto justify-center max-w-2xl border border-blue-500 p-4 rounded-lg my-4"}>

        <FilterNavbar/>
        <AddTodo/>
        <TodoList/>
    </div>
}