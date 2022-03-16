import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

import TaskRoutes from "./TaskRoutes";
import { AuthRoutes } from "./SignInRoutes";
import AppRoutes from "./AppRoutes";

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            { user.userId ? <AppRoutes /> : <AuthRoutes /> }
        </NavigationContainer>
    );
}