import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import commonStyles from "../commonStyles";

export default function Loader() {
    return (
        <View style={styles.loadContainer}>
            <ActivityIndicator
                color={commonStyles.colors.primary}
                size="large"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})