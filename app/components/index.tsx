"use client"

import React, {useState, useEffect} from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "In Progress" | "To Do" | "Complete";
}

const TaskManager: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Retrieve tasks from local storage on initial load
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleAddTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Math.random().toString(),
            title,
            description,
            status: "To Do",
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleEditTask = (taskId: string, updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleUpdateStatus = (taskId: string, status: "In Progress" | "To Do" | "Complete") => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? {...task, status} : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return <div className={"my-6"}>

        <h1 className={"text-2xl text-center font-semibold mb-3 text-blue-600"}>
            Task Manager Assignment
        </h1>
        <div className={"flex gap-8 mx-auto items-start justify-center my-10"}>
            <TaskForm onSubmit={handleAddTask}/>
            <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onUpdateStatus={handleUpdateStatus}
            />

        </div>


    </div>
}

export default TaskManager;
