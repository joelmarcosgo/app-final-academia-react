import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import commonStyles from '../commonStyles';

export default function Calendar(props) {
    return (
        <View style={styles.calendar}>
            <CalendarPicker
                style={styles.calendarContent}
                onDateChange={date => props.onDateChange(date)}
                nextTitle='Próximo'
                previousTitle='Anterior'
                months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                selectedDayStyle={{
                    backgroundColor: commonStyles.colors.primary,
                    borderRadius: 3
                }}
                textStyle={{
                    fontFamily: commonStyles.fonts.regular,
                    color: commonStyles.colors.subText,
                }}
                selectedDayTextColor={commonStyles.colors.shape}
                headerWrapperStyle={{
                    paddingHorizontal: 12
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: commonStyles.colors.shape,
        borderWidth: 1.5,
        borderColor: commonStyles.colors.border,
        borderRadius: 3,
        margin: 16,
    }
});