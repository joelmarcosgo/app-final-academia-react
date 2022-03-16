import axios from "axios";
import { Alert, Platform } from "react-native";

const server = 'https://serene-cliffs-67606.herokuapp.com';

const api = axios.create({
    baseURL: server
})

function showError(err) {
    Alert.alert('Erro', `Ocorreu o erro: ${err}`);
}

function showSuccess(msg) {
    Alert.alert('Successo', `${msg}`);
}

export { api, showError, showSuccess };