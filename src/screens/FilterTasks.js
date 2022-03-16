import React, { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTask } from "../context/TaskContext";
import Loader from "../components/Loader";
import Task from "../components/Task";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { TaskService } from "../services/TaskService";

export default function FilterTasks(props) {
    const { state, isLoading } = useTask();
    const [loading, setLoading] = useState(true);
    const { title, days } = props;
    const showDoneTasks = true
    const [tasks, setTasks] = useState([]);

    useFocusEffect(useCallback(() => {
        getTasksToday();
    }, [state]))

    const getTasksToday = async () => {
        let tasks;
        const responseToday = await TaskService.getTasksByDate(days)
        tasks = responseToday.data;
        setTasks(tasks);
        setLoading(false);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.iconBar}>
                <Text style={styles.textBar}>Você tem {tasks.length} tarefa{tasks.length !== 1 && 's'}</Text>
                <TouchableOpacity
                    onPress={() => {}}
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
                        data={tasks}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => (
                            <Task
                                {...item}
                            />
                        )}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.background
    },
    header: {
        width: '100%',
        paddingTop: Platform.OS === 'ios' ? 67 : 44,
        paddingBottom: 19,
        backgroundColor: commonStyles.colors.primary,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fonts.regular,
        fontSize: 18,
        lineHeight: 27,
        color: commonStyles.colors.shape
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    taskList: {
        flex: 7
    },
    // title: {
    //     fontFamily: commonStyles.fontFamily,
    //     color: commonStyles.colors.secondary,
    //     fontSize: 50,
    //     marginLeft: 20,
    //     marginBottom: 20
    // },
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