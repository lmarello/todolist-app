import React from 'react'
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import RNCheckboxCard from 'react-native-checkbox-card'

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 60,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
        paddingHorizontal: 0,
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        color: '#777777',
    },
})

export default ({ id, title, completed, onCompletePress }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <RNCheckboxCard
                darkMode={true}
                text={title}
                isChecked={completed}
                onPress={(checked) => onCompletePress(id, checked)}
            />
        </TouchableOpacity>
    )
}
