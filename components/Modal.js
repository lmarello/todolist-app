import React from 'react'
import { StyleSheet, Modal, View, Dimensions, Button } from 'react-native'

export default ({ children, visible, onCancel, onConfirm }) => {
    return (
        <Modal animationType={'slide'} transparent={true} visible={visible}>
            <View style={styles.center}>
                <View style={styles.modalContent}>
                    {children}
                    <View style={styles.modalButtons}>
                        <View style={styles.button}>
                            <Button
                                title="Close"
                                onPress={onCancel}
                                color="#dbdbdb"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button title="Save" onPress={onConfirm} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        height: 150,
        width: Dimensions.get('window').width - 60,
    },
    modalButtons: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
    },
    button: {
        marginHorizontal: 10,
    },
})
