import React, { createContext, useReducer, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskService } from "../services/TaskService";
import { showError, showSuccess } from "../common";

const TaskContext = createContext({});

const initialState = { tasks: [] };

const actions = {
    // action creators
    listTasks: (state, action) => {
        const tasks = action.payload;
        return {
            ...state,
            tasks,
            visibleTasks: tasks
        }
    },
    addTask: (state, action) => {
        const task = action.payload;
        return {
            ...state,
            tasks: [ ...state.tasks, task ]
        }
    },
    markTaskAsDone: (state, action) => {
        const task = action.payload;
        return {
            ...state,
            tasks: state.tasks.map(item => item._id === task._id ? task : item)
        };
    },
    deleteTask: (state, action) => {
        const task = action.payload;
        return {
            ...state,
            tasks: state.tasks.filter(item => item._id !== task._id)
        }
    }
}

function TaskProvider(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [showDoneTask, setShowDoneTask] = useState(false);

    function reducer(state, action) {
        switch (action.type) {
            case 'list_tasks':
                return actions.listTasks(state, action);

            case 'add_task':
                return actions.addTask(state, action);

            case 'mark_task_as_done':
                return actions.markTaskAsDone(state, action);

            case 'delete_task':
                return actions.deleteTask(state, action);

            default:
                return state;
        }
    }

    // funcao para buscar a lista de tasks
    async function getTasks() {
        try {
            const response = await TaskService.getTasks();
            dispatch({
                type: 'list_tasks',
                payload: response.data
            })
            setIsLoading(false)
        } catch (error) {
            showError(error);
        }
    }

    async function addTask(newTask, user) {
        try {
            const response = await TaskService.newTask({
                desc: newTask.desc,
                estimateAt: newTask.estimateAt,
                userId: user.userId
            })
            dispatch({
                type: 'add_task',
                payload: response.data
            })
            await getTasks();
        } catch (error) {
            throw new Error(error);
        }
    }

    // funcao para marcar a task como concluída
    async function markTaskAsDone(taskId) {
        try {
            const task = state.tasks.find(task => task._id === taskId);
            const response = await TaskService.doneTask(taskId, task)
            dispatch({
                type: 'mark_task_as_done',
                payload: response.data
            })
            await getTasks()
        } catch (error) {
            showError(error)
        }
    }

    async function deleteTask(id) {
        try {
            const response = await TaskService.deleteTask(id);
            showSuccess('Tarefa excluída com sucesso!');
            dispatch({
                type: 'delete_task',
                payload: response.data
            })
            await getTasks()
        } catch (error) {
            showError(error);
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    async function getStateAsyncStorage() {
        const stateString = await AsyncStorage.getItem('tasksState');
        if(stateString) {
            const statePrevious = JSON.parse(stateString);
            setShowDoneTask(statePrevious.showDoneTasks);
        }
    }

    useEffect(() => {
        getTasks();
        getStateAsyncStorage()
    }, [state]);

    return (
        <TaskContext.Provider 
            value={{ 
                state,
                isLoading,
                markTaskAsDone,
                deleteTask,
                addTask,
                showDoneTask
            }}
        >
          {props.children}
        </TaskContext.Provider>
    );
}

function useTask() {
    const context = useContext(TaskContext);

    return context;
}

export { TaskProvider, useTask };