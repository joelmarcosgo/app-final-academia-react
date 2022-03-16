import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from '../screens/Auth';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(props) {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen 
                name="SignIn"
                component={Auth}
            />
        </Navigator>
    );
}