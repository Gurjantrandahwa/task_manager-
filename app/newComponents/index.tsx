import React from "react";
import FilterNavbar from "./FilterNavbar";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function ToDo() {
    return <div
        className={"flex flex-col gap-4 mx-auto justify-center max-w-2xl border border-blue-500 p-4 rounded-lg my-4"}>
<h1 className={"font-bold text-xl text-blue-600 text-center"}>
    To Do List
</h1>
        <FilterNavbar/>
        <AddTodo/>
        <TodoList/>
    </div>
}