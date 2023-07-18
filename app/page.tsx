import React from 'react';
import AddTodo from "./newComponents/AddTodo";
import TodoList from "./newComponents/TodoList";
import FilterNavbar from "./newComponents/FilterNavbar";


const Page = () => {
    return <main className={"mt-5 px-5"}>
        <h2 className={"text-center text-blue-600 font-semibold text-2xl mb-6"}>
            Task Manager
        </h2>
        <FilterNavbar/>
        <AddTodo/>
        <TodoList/>
    </main>
}

export default Page;