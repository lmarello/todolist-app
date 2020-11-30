import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native'
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

    const onSubmit = (values) => {
        fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then((x) => x.text())
            .then((x) => {
                // TODO: Cambiar esto por status code
                if (x === 'Usuario creado.') {
                    return Alert.alert('Éxito', x, [
                        {
                            text: 'Ir al inicio',
                            onPress: () => navigation.navigate('Login'),
                        },
                    ])
                }
                return Alert.alert('Error', x)
            })
    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
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
            <Button title="Enviar" onPress={handleSubmit} />
            <Button
                title="Volver al inicio"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}
