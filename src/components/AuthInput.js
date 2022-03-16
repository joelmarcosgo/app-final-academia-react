import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AuthInput (props) {
    return (
        <View style={[styles.container, props.style]}>
            <Icon style={styles.icon} name={props.icon} size={20} />
            <TextInput {...props} style={[styles.inputText, props.style]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#EEE',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    icon: {
        color: '#333',
        marginLeft: 20
    },
    inputText: {
        marginLeft: 20,
        width: '70%'
    }
});