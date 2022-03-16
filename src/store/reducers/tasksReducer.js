import { TaskService } from "../../services/TaskService";
import {
    LIST_TASKS,
    ADD_TASKS,
    MARK_TASK_AS_DONE,
    DELETE_TASK
} from "../actions/actionTypes";

const initialState = { tasks: [] };

/* eslint-disable */
export default async function(state = initialState, action) {
    switch (action.type) {
        case LIST_TASKS:
            const tasks = action.payload;
            return {
                ...state,
                tasks
            };

        case ADD_TASKS:
            const task = action.payload;
            return {
                ...state,
                tasks: [...state.tasks, task]
            };

        default:
            return state;
    }
}