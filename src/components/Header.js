import React from 'react';
import { StyleSheet, View, Platform, StatusBar, TouchableOpacity, Text, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import commonStyles from '../commonStyles';

export default function Header (props) {
    const { user } = props;

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <View style={styles.userWrapper}>
                <View style={styles.userInfo}>
                    <Image style={styles.photo}
                        source={{ uri: (user && user.photo) ? user.photo : 'https://github.com/joelmarcosgo.png' }} 
                    />
                    <View style={styles.user}>
                        <Text style={styles.userGreeting}>Olá,</Text>
                        <Text style={styles.userName}>{user && user.name ? user.name : 'Seja bem-vindo!'}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={props.signOut}>
                    <Icon name='power' size={30} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.colors.primary,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    userWrapper: {
        width: '100%',
        padding: 24,
        marginTop: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    photo: {
        width: 48,
        height: 48,
        borderRadius: 10
    },
    user: {
        marginLeft: 17
    },
    userGreeting: {
        color: commonStyles.colors.shape,
        fontSize: 18,
        fontFamily: commonStyles.fontFamily
    },
    userName: {
        color: commonStyles.colors.shape,
        fontSize: 18,
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold'
    }
});