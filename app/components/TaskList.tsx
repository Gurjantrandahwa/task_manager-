import { observer } from 'mobx-react';
import { TaskInstance } from '../store/Task';

interface TaskListProps {
    tasks: TaskInstance[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                </div>
            ))}
        </div>
    );
};

export default observer(TaskList);
