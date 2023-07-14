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
    onUpdateStatus: (
        taskId: string,
        status: "In Progress" | "To Do" | "Complete"
    ) => void;
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

    const handleStartEditing = (
        taskId: string,
        title: string,
        description: string,
        status: "In Progress" | "To Do" | "Complete"
    ) => {
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

    const handleUpdateStatus = (
        taskId: string,
        status: "In Progress" | "To Do" | "Complete"
    ) => {
        onUpdateStatus(taskId, status);
    };

    const openEditDialog = (
        taskId: string,
        title: string,
        description: string,
        status: "In Progress" | "To Do" | "Complete"
    ) => {
        handleStartEditing(taskId, title, description, status);
    };


    const getClassName = (taskStatus: string, element: string) => {
        let className = "";
        if (element === "card") {
            className = "flex items-center drop-shadow mb-4 p-3 max-w-md transition-colors gap-4";
        } else if (element === "text") {
            className = "text-sm";
        }
        if (taskStatus === "In Progress") {
            className += " bg-yellow-300";
        } else if (taskStatus === "Complete") {
            className += " bg-green-300";
        } else {
            className += " bg-blue-300";
        }
        return className;
    };

    return <div>
        {tasks.map((task) => (
            <div key={task.id} className="flex flex-col">
                {editingTaskId === task.id ? (
                    <div className={"flex flex-col drop-shadow-lg p-4 "}>
                        <input
                            className="p-2 rounded outline-[#068FFF] mt-6 border border-[#068FFF]"
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
                    <div className={getClassName(task.status, "card")}>
                        <div>
                            <h3
                                className={`font-semibold text-xl capitalize ${getClassName(
                                    task.status,
                                    "text"
                                )}`}
                            >
                                {task.title}
                            </h3>
                            <p className={`text-slate-700 ${getClassName(task.status, "text")}`}>
                                {task.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 justify-center bg-[#068FFF] px-2 rounded">

                                <button
                                    onClick={() =>
                                        openEditDialog(
                                            task.id,
                                            task.title,
                                            task.description,
                                            task.status
                                        )
                                    }
                                >
                                    <AiFillEdit className={"text-white text-xl bg-[#068FFF]"} />
                                </button>
                                <button onClick={() => handleDeleteTask(task.id)} className={""}>
                                    <AiFillDelete className="text-xl text-red-500 bg-[#068FFF]" />
                                </button>

                            {/* Status change options*/}
                            <select
                                className="outline-none p-1 bg-[#068FFF] text-white"
                                value={task.status}
                                onChange={(e) =>
                                    handleUpdateStatus(
                                        task.id,
                                        e.target.value as "In Progress" | "To Do" | "Complete"
                                    )
                                }
                            >
                                <option value="In Progress" className=" text-black text-sm">
                                    In Progress
                                </option>
                                <option value="To Do" className="  text-black text-sm">
                                    To Do
                                </option>
                                <option value="Complete" className=" text-black text-sm">
                                    Complete
                                </option>
                            </select>

                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
};

export default TaskList;
