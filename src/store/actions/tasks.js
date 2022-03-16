import { TaskService } from '../../services/TaskService';
import {
    LIST_TASKS,
    ADD_TASKS,
    MARK_TASK_AS_DONE,
    DELETE_TASK
} from './actionTypes';

// action creators
export function addTask (task) {
    return dispatch => {
        TaskService.newTask(task).then(response => {
            dispatch(createTask(response.data))
        })
    }
}

const createTask = (task) => ({
    type: ADD_TASKS,
    payload: task
})