"use client"

import React from 'react';
import TaskManager from "./components";
import ToDo from "./newComponents";


const Page = () => {

    return <div className={"container xl mx-auto px-4"}>

        {/* this task manager assignment given/*/}

        <TaskManager/>

        {/* this to do list new version of the task manager*/}

        <ToDo/>


    </div>
}

export default Page;