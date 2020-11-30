import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useForm } from '../hooks'
import { API_URL } from '@env'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
})

export default ({ navigation }) => {
    const initialState = {
        email: '',
        password: '',
    }

    const onSubmit = async (values) => {
        await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then((x) => x.text())
            .then((x) => {
                try {
                    return JSON.parse(x)
                } catch {
                    throw x
                }
            })
            .then((x) => {
                AsyncStorage.setItem('token', x.token)
                navigation.navigate('Todos')
            })
            .catch((e) => {
                Alert.alert('Error', e)
            })
    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                autoCapitalize="none"
                value={inputs.email}
                onChangeText={subscribe('email')}
                style={styles.input}
                placeholder="Email"
            />
            <TextInput
                autoCapitalize="none"
                value={inputs.password}
                onChangeText={subscribe('password')}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <Button title="Iniciar sesión" onPress={handleSubmit} />
            <Button
                title="Registrarme"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}
