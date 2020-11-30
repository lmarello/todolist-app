import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {
    TodosScreen,
    LoginScreen,
    RegisterScreen,
    AuthLoading,
} from './screens'

const OnBoardingNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
    },
    {
        initialRouteName: 'Login',
    }
)

const AppNavigator = createStackNavigator(
    {
        Todos: {
            screen: TodosScreen,
        },
    },
    {
        initialRouteName: 'Todos',
    }
)

const RootStack = createStackNavigator(
    {
        Main: AppNavigator,
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

const BaseStack = createSwitchNavigator(
    {
        AuthLoading,
        OnBoarding: OnBoardingNavigator,
        Root: RootStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
)

export default createAppContainer(BaseStack)
