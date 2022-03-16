import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles';
import { Button, ListItem } from 'react-native-elements';
import { useTask } from '../context/TaskContext';

export default function Task (props) {
    const { markTaskAsDone, deleteTask } = useTask();
    const doneOrNotStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {};
    const date = props.doneAt ? props.doneAt : props.estimateAt;
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

    return (
        <ListItem bottomDivider style={{ marginBottom: 6 }}>
            <TouchableOpacity
                onPress={() => markTaskAsDone(props._id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableOpacity>
            <ListItem.Content>
                <ListItem.Title style={[styles.desc, doneOrNotStyle]} >{props.desc}</ListItem.Title>
                <ListItem.Subtitle style={styles.date}>{formatedDate}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity  onPress={() => deleteTask(props._id)}>
                <Icon name='trash' size={28} color={commonStyles.colors.attention} />
            </TouchableOpacity>
        </ListItem>
    )
}

function getCheckView(doneAt) {
    if (doneAt !== null) {
        return (
            <View style={styles.done}>
                <Icon
                    name='check'
                    size={20}
                    color={commonStyles.colors.shape}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.pending} />
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: commonStyles.colors.shape,
        marginBottom: 8
    },
    container: {
        flexDirection: 'row',
        // borderColor: commonStyles.colors.text,
        // borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingVertical: 10,
        // backgroundColor: commonStyles.colors.shape,
        // marginBottom: 8
    },
    checkContainer: {
        // width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 24,
        width: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: commonStyles.colors.text
    },
    done: {
        height: 24,
        width: 24,
        borderRadius: 6,
        backgroundColor: commonStyles.colors.success,
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.title,
        fontSize: 16
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13
    },
    right: {
        // backgroundColor: commonStyles.colors.attention,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: commonStyles.colors.attention,
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.shape,
        fontSize: 20,
        margin: 10
    }
});