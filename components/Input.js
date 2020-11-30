import React from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'

export default ({ title, ...otherProps }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.title}>{title}</Text>
            <TextInput {...otherProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: 40,
        display: 'flex',
    },
    title: {
        fontSize: 18,
    },
})
