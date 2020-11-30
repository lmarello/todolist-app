import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { ListItem, Loading, Modal, Input } from '../components'
import { todoApi } from '../services'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232020',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    header: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingTop: 50,
    },
    headerTitleWrapper: {},
    headerCreateWrapper: {
        paddingRight: 30,
    },
    createButtonText: {
        color: '#f9d142',
        fontSize: 40,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        paddingLeft: 20,
    },
    subTitle: {
        color: '#949494',
        fontSize: 16,
        paddingLeft: 28,
    },
    list: {
        alignSelf: 'stretch',
    },
    modalAddToDoWrapper: {
        padding: 20,
    },
    modalAddToDoTitle: {
        fontSize: 18,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

const Todos = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [todoDescription, setTodoDescription] = useState('')

    const getTodos = async () => {
        const data = await todoApi.getAll()
        setTodos(data)
        setLoading(false)
    }

    useEffect(() => {
        getTodos()
    }, [])

    const handleOnPress = async (id, completed) => {
        await todoApi.update(id, { completed })
        getTodos()
    }

    const handleLogoutClick = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    const handleOnCreate = async () => {
        setModalOpen(false)
        await todoApi.create(todoDescription)
        await getTodos()
    }

    const handleOnCreateClick = () => {
        setModalOpen(true)
    }

    const handleOnDescriptionChange = (description) => {
        setTodoDescription(description)
    }

    const resetModal = () => {
        setTodoDescription('')
        setModalOpen(false)
    }

    const renderModalContent = () => {
        return (
            <View style={styles.modalAddToDoWrapper}>
                <Input
                    style={styles.modalAddToDoTitle}
                    title="Add ToDo"
                    placeholder="Description"
                    onChangeText={handleOnDescriptionChange}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* <Button title="Cerrar sesión" onPress={handleLogoutClick} /> */}

                    <View style={styles.header}>
                        <View style={styles.headerTitleWrapper}>
                            <Text style={styles.title}>Todo List</Text>
                            <Text style={styles.subTitle}>by Leo Marello</Text>
                        </View>
                        <View style={styles.headerCreateWrapper}>
                            <TouchableOpacity
                                style={styles.createButton}
                                onPress={handleOnCreateClick}
                            >
                                <Text style={styles.createButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        visible={modalOpen}
                        onCancel={resetModal}
                        onConfirm={handleOnCreate}
                    >
                        {renderModalContent()}
                    </Modal>

                    <FlatList
                        data={todos}
                        keyExtractor={(x) => String(x._id)}
                        renderItem={({ item }) => (
                            <ListItem
                                onCompletePress={handleOnPress}
                                id={item._id}
                                title={item.description}
                                completed={item.completed}
                            />
                        )}
                    />
                </>
            )}
        </View>
    )
}

Todos.navigationOptions = { header: null }

export default Todos
