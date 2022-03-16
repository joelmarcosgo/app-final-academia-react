import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

export default function SignInSocialButton (props) {
    return(
        <TouchableOpacity {...props} style={styles.button}>
            <View style={styles.imagemContainer}>
                <Icon name={props.icon} {...props} />
            </View>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        backgroundColor: commonStyles.colors.shape,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    imagemContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderColor: commonStyles.colors.background,
        borderRightWidth: 1
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontFamily: commonStyles.fonts.medium,
        fontSize: 14,
        color: commonStyles.colors.orange
    }
})