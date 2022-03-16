import { api } from "../common";

export const TaskService = {
    getTasks: () => {
        return api.get('/tasks');
    },
    newTask: (task) => {
        return api.post('/tasks', task);
    },
    getTasksByDate: (days) => {
        if (days !== null) {
            return api.get('/tasksby/' + days);
        } else {
            return api.get('/tasksby');
        }
    },
    doneTask: (taskId, task) => {
        return api.patch('/tasks/' + taskId, task);
    },
    deleteTask: (id) => {
        return api.delete('/tasks/' + id);
    }
}



// app.get('/tasks/:id', getTaskById);

// app.put('/tasks/:id', putTask);
// app.patch('/tasks/:id', patchtTask);