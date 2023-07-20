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
            className = "flex items-center drop-shadow mb-4 p-3 max-w-md transition-colors gap-4 rounded-md";
        } else if (element === "text") {
            className = "text-sm";
        }
        if (taskStatus === "In Progress") {
            className += " bg-yellow-400";
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
                            className={"bg-blue-500 text-white"}
                            value={taskStatus}
                            onChange={(e) =>
                                setTaskStatus(e.target.value as "In Progress" | "To Do" | "Complete")
                            }
                        >
                            <option value="In Progress" >In Progress</option>
                            <option value="To Do">To Do</option>
                            <option value="Complete">Complete</option>

                        </select>
                        <div>
                            <button onClick={() => handleSaveEditing(task.id)}
                                  >Save
                            </button>
                            <button onClick={handleCancelEditing}
                                  >Cancel
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

                        <div className={"bg-blue-500 text-white"}>

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
                                    <AiFillEdit  className={"bg-blue-500 text-white"}/>
                                </button>
                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <AiFillDelete className="bg-blue-500 text-white" />
                                </button>

                            {/* Status change options*/}
                            <select
                                className={"outline-none border-none bg-blue-500 text-white"}
                                value={task.status}
                                onChange={(e) =>
                                    handleUpdateStatus(
                                        task.id,
                                        e.target.value as "In Progress" | "To Do" | "Complete"
                                    )
                                }
                            >
                                <option value="In Progress" className={""} >
                                    In Progress
                                </option>
                                <option value="To Do">
                                    To Do
                                </option>
                                <option value="Complete" >
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
