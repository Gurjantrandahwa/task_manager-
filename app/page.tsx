"use client"


import { observer } from 'mobx-react';
import { useState } from 'react';
import {TaskInstance,TaskModel} from "./store/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


const Home:React.FC = () => {
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const handleAddTask = (title: string, description: string) => {
    const task = TaskModel.create({
      id: Math.random().toString(),
      title,
      description,
      status: 'To Do',
    });
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  return<>
    <div>
      <h1>Task Manager</h1>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  </>
}

export default observer(Home);