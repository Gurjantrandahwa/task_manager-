import React, {useState} from "react";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "In Progress" | "To Do" | "Complete";
}

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (taskId: string, updatedTask: Task) => void;
    onUpdateStatus: (taskId: string, status: "In Progress" | "To Do" | "Complete") => void;
}

const TaskList: React.FC<TaskListProps> = ({
                                               tasks,
                                               onDeleteTask,
                                               onEditTask,
                                               onUpdateStatus,
                                           }) => {
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState<"In Progress" | "To Do" | "Complete">("To Do");

    const handleStartEditing = (taskId: string, title: string, description: string, status: "In Progress" | "To Do" | "Complete") => {
        setEditingTaskId(taskId);
        setEditedTitle(title);
        setEditedDescription(description);
        setTaskStatus(status);
    };

    const handleCancelEditing = () => {
        setEditingTaskId(null);
        setEditedTitle("");
        setEditedDescription("");
        setTaskStatus("To Do");
    };

    const handleSaveEditing = (taskId: string) => {
        const updatedTask: Task = {
            id: taskId,
            title: editedTitle,
            description: editedDescription,
            status: taskStatus,
        };
        onEditTask(taskId, updatedTask);
        setEditingTaskId(null);
        setEditedTitle("");
        setEditedDescription("");
        setTaskStatus("To Do");
    };

    const handleDeleteTask = (taskId: string) => {
        onDeleteTask(taskId);
    };

    const handleUpdateStatus = (taskId: string, status: "In Progress" | "To Do" | "Complete") => {
        onUpdateStatus(taskId, status);
    };

    const openEditDialog = (taskId: string, title: string, description: string, status: "In Progress" | "To Do" | "Complete") => {
        handleStartEditing(taskId, title, description, status);
    };

    return <div>
        {tasks.map((task) => (
            <div key={task.id} className="flex flex-col">
                {editingTaskId === task.id ? (
                    <div className={"flex flex-col drop-shadow-lg p-4 "}>
                        <input
                            className="p-2 w-full rounded outline-[#068FFF] mt-6 border border-[#068FFF]"
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                            className="p-2 w-full rounded outline-[#068FFF] mt-6 border border-[#068FFF]"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        <select
                            className="mt-4 mb-6 outline-blue-500 p-2 bg-[#068FFF] rounded text-white"
                            value={taskStatus}
                            onChange={(e) =>
                                setTaskStatus(e.target.value as "In Progress" | "To Do" | "Complete")
                            }
                        >
                            <option value="In Progress" className=" text-black text-sm">In Progress</option>
                            <option value="To Do" className="  text-black text-sm">To Do</option>
                            <option value="Complete" className=" text-black text-sm">Complete</option>
                        </select>
                        <div className=" flex justify-between">
                            <button onClick={() => handleSaveEditing(task.id)}
                                    className=" bg-[#068FFF] px-4 text-white rounded py-2">Save
                            </button>
                            <button onClick={handleCancelEditing}
                                    className=" border border-[#068FFF] px-4 text-[#068FFF] py-2 rounded">Cancel
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className={" flex flex-col "}>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <p className="text-slate-600 text-sm">{task.description}</p>
                        <div className=" flex items-start gap-6 justify-center">
                            <select
                                className="mt-4 mb-6 outline-blue-500 p-2 bg-[#068FFF] rounded text-white"
                                value={task.status}
                                onChange={(e) =>
                                    handleUpdateStatus(task.id, e.target.value as "In Progress" | "To Do" | "Complete")
                                }
                            >
                                <option value="In Progress" className=" text-black text-sm">In Progress</option>
                                <option value="To Do" className="  text-black text-sm">To Do</option>
                                <option value="Complete" className=" text-black text-sm">Complete</option>
                            </select>
                            <div className="flex gap-4 mt-5">
                                <button
                                    onClick={() => openEditDialog(task.id, task.title, task.description, task.status)}>
                                    <AiFillEdit className={"text-blue-500  text-xl"}/>
                                </button>
                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <AiFillDelete className="text-xl text-red-600"/>
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        ))}
    </div>
};

export default TaskList;
