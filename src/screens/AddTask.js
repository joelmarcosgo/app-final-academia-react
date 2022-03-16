import React, { Component, useState } from "react";
import {
    Platform, // para o DateTimePicker
    Modal,
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    TouchableWithoutFeedback,
    StatusBar
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import commonStyles from '../commonStyles';
import moment from "moment";
import Calendar from "../components/Calendar";
import { showError } from "../common";

const initialState = { 
    desc: '', 
    date: new Date(), 
    showDatePicker: false,
}

export default function AddTask (props) {
    const [data, setData] = useState({...initialState});

    // funçao para salvar uma tarefa
    const save = () => {
        try {
            const newTask = {
                desc: data.desc,
                estimateAt: data.date
            }
            if(!newTask.desc || !newTask.desc.trim()) {
                throw new Error('Dados inválidos', 'Descrição da tarefa não informada!');
                
            }
            props.onSave && props.onSave(newTask); // renderização condicional
            setData({ ...initialState });
        } catch (error) {
            showError(error);
        }
    }

    return (
        <Modal transparent={true} visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide'>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input}
                    multiline
                    placeholder="Informe a tarefa"
                    value={data.desc}
                    onChangeText={desc => setData({ ...data, desc })}
                />
                <Calendar onDateChange={date => setData({ ...data, date })}/>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.buttonCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save}>
                        <Text style={styles.buttonSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.background
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.orange,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 60,
        padding: 16,
        margin: 16,
        backgroundColor: commonStyles.colors.shape,
        borderWidth: 1.5,
        borderColor: commonStyles.colors.border,
        borderRadius: 2,
        flexWrap: 'wrap',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonCancel: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.attention,
        paddingVertical: 15,
    },
    buttonSave: {
        margin: 20,
        marginRight: 15,
        backgroundColor: commonStyles.colors.success,
        color: commonStyles.colors.shape,
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 2
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 24,
        marginLeft: 16
    }
});