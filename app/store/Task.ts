import { types, Instance } from 'mobx-state-tree';
import { Task } from '../types/Task';

export const TaskModel = types
    .model('Task', {
        id: types.identifier,
        title: types.string,
        description: types.string,
        status: types.string,
    })
    .actions((self) => ({
        setTitle(title: string) {
            self.title = title;
        },
        setDescription(description: string) {
            self.description = description;
        },
        setStatus(status: string) {
            self.status = status;
        },
    }));

export type TaskInstance = Instance<typeof TaskModel>;
