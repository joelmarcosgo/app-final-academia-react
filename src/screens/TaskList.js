import React, { useState, useEffect, useCallback } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground, 
    FlatList, 
    TouchableOpacity, 
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

import moment from 'moment';
import 'moment/locale/pt-br';
import Task from '../components/Task';
import AddTask from './AddTask';
import { showError, showSuccess } from '../common';
import { TaskService } from '../services/TaskService';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTask } from '../context/TaskContext';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { addTask, getTasksApi } from '../store/actions/tasks';

const TaskList = (props) => {
    const { user, signOut } = useAuth();
    const {  addTask, state, isLoading, showDoneTask } = useTask();
    const [showDoneTasks, setShowDoneTasks] = useState(showDoneTask);
    const [showAddTask, setShowAddTask] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { createTask } = props;

    useFocusEffect(useCallback(() => {
        reloadScreen();
    }, [state]));

    const reloadScreen = async () => { // filtra ao entrar na aplicação
        await filterTasks();
    }

    // utilizaremos o AsyncStorage neste método
    const filterTasks = async () => {
        let visibleAllTasks;
        if(showDoneTasks) {
            visibleAllTasks = [...state.tasks];
        } else {
            const pending = task => task.doneAt === null;
            visibleAllTasks = state.tasks.filter(pending);
        }
        setVisibleTasks([...visibleAllTasks]);
        // armazenamos (atualizamos) o estado no storage
        await AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks
        }))
        setLoading(false);
    }

    const toogleFilter = async () => {
        setShowDoneTasks(!showDoneTasks); // filtra ao clicar no olho
        await filterTasks();
    }

    // // função para adicionar tarefa cujo conteudo é gerado em AddTask (props)
    const onCreateTask = async (newTask) => {
        setShowAddTask(false);
        createTask(newTask);
        showSuccess('Tarefa incluída com sucesso');
    }

    const numberOfTasks = state.tasks.length;
    const tasksTotals = numberOfTasks === 1 ? '1 tarefa' : `${numberOfTasks} tarefas`;

    return (
        <View style={styles.container}>
            <AddTask 
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                onSave={onCreateTask}
            />
            <Header user={user} signOut={signOut} />
            <View style={styles.iconBar}>
                <Text style={styles.textBar}>Você tem {tasksTotals}</Text>
                <TouchableOpacity 
                    onPress={toogleFilter}
                >
                    <Icon 
                        name={showDoneTasks ? 'eye' : 'eye-slash'}
                        size={26}
                        color={commonStyles.colors.subText}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
                {
                    isLoading || loading ?
                    <Loader /> : 
                    <FlatList 
                        data={visibleTasks.length <= 0 ? state.tasks : visibleTasks}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => (
                            <Task
                                {...item}
                            />
                        )}
                    />
                }
            </View>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.6}
                onPress={() => setShowAddTask(true)}
            >
                <Icon name='plus' size={20} color={commonStyles.colors.secondary}/>
            </TouchableOpacity>
        </View>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        createTask: (task) => {
            const action = addTask(task);
            dispatch(action); // este action é passado para todos os reducers
        }
    }
}

export default connect(null, mapDispatchToProps)(TaskList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.background
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    titleUser: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        color: commonStyles.colors.secondary,
        fontSize: 20,
    },
    iconBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 12
    },
    textBar: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.success,
        justifyContent: 'center',
        alignItems: 'center'
    }
});