import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from '../screens/TaskList';

const { Navigator, Screen } = createNativeStackNavigator();

export default function TaskRoutes (props) {
    return(
        <Navigator screenOptions={screenOptions}>
            <Screen 
                name="Home"
                component={TaskList}
            />
        </Navigator>
    );
}

const screenOptions = {
    headerShown: false
}