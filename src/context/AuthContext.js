import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../services/AuthService";
import { showError, showSuccess } from "../common";
import * as AuthSession from 'expo-auth-session';

const AuthContext = createContext({});

function AuthProvider(props) {
    const [user, setUser] = useState({});
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey = 'loginTasks';

    const signin = async (state) => {
        try {
            if(!state.email && !state.password) {
                throw new Error('E-mail e senha são obrigatórios');
            }
            const response = await AuthService.signin({
                email: state.email,
                password: state.password
            });
            setUser(response.data);
            await AsyncStorage.setItem('loginTasks', JSON.stringify(response.data));
        } catch (error) {
            showError(error);
        }
    }

    const signup = async (state) => {
        try {
            if(state.password !== state.confirmPassword) {
                throw new Error('As senhas não conferem');
            }

            await AuthService.signup({
                name: state.name,
                email: state.email,
                password: state.password
            });
            showSuccess('Sua conta foi criada com sucesso!');
        } catch (error) {
            showError(error);
        }
    }

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '49061962795-mukshgrdlkha715l68uiv12nulkrl26s.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@joelmarcosgo/mytasksappfinal';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({authUrl});
            if(type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const userLogged = {
                    id: String(userInfo.id),
                    name: userInfo.name,
                    email: userInfo.email,
                    photo: userInfo.picture,
                    userId: userInfo.id.toString(),
                    accessToken: params.access_token
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
                await AuthService.signup({
                    name: userInfo.name,
                    email: userInfo.email,
                    password: userInfo.email,
                    userId: userInfo.id.toString(),
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem(userStorageKey);
        setUser({});
    }

    useEffect(() => {
        async function loadStorageData() {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);
            if(userStoraged) {
                const userLogged = JSON.parse(userStoraged);
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }
        loadStorageData();
    })

    return (
        <AuthContext.Provider value={{
            user,
            signOut,
            userStorageLoading,
            signin,
            signup,
            signInWithGoogle
        }} >
          {props.children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
