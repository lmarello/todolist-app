import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '@env'

const getAll = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const uri = `${API_URL}/todos`
        const response = await fetch(uri, {
            headers: {
                'access-token': token,
                'Content-Type': 'application/json',
            },
        })
        const todos = await response.json()
        return todos
    } catch (error) {}
}

const create = async (description) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const uri = `${API_URL}/todos`

        const todo = { description }

        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        })
        const createdTodo = await response.json()
        return createdTodo
    } catch (error) {}
}

const update = async (id, todo) => {
    try {
        console.log('update')
        const token = await AsyncStorage.getItem('token')
        const uri = `${API_URL}/todos/${id}`

        const response = await fetch(uri, {
            method: 'PUT',
            headers: {
                'access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        })
        const updatedTodo = await response.json()
        return updatedTodo
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAll: getAll,
    create: create,
    update: update,
}
