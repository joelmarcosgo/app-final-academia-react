import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskList from '../screens/TaskList';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";

import commonStyles from '../commonStyles';
import { Platform } from 'react-native';
import FilterTasks from '../screens/FilterTasks';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes (props) {
    return (
        <Navigator
            screenOptions={screenOptions}
            initialRouteName="Todas"
        >
            <Screen 
                name='Todas' 
                component={TaskList}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcon 
                            name="ballot"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Hoje'
                // component={FilterTasks}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialCommunityIcon 
                            name="calendar-clock"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            >
                { props => (
                    <FilterTasks title="Tarefas de Hoje" days={null} />
                )}
            </Screen>
            <Screen 
                name='10 dias'
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <Ionicons
                            name="calendar-sharp"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            >
                { props => (
                    <FilterTasks title="Tarefas dos Próximos 10 dias" days={10} />
                )}
            </Screen>
            <Screen 
                name='30 dias'
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <FoundationIcon 
                            name="calendar"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            >
                { props => (
                    <FilterTasks title="Tarefas dos Próximos 30 dias" days={31} />
                )}
            </Screen>
        </Navigator>
    );
}

const screenOptions = {
    tabBarActiveTintColor: commonStyles.colors.primary,
    tabBarInactiveTintColor: commonStyles.colors.subText,
    headerShown: false,
    tabBarStyle: {
        paddingVertical: Platform.OS === 'ios' ? 20 : 10,
        height: 70,
    },
    tabBarLabelStyle: {
        fontSize: 18,
        paddingBottom: 10
    }
}