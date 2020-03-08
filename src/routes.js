import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Points from './Points';
import Reader from './Reader';
import Register from './Register'
const App = createStackNavigator({
    Login: Login,
    Points: Points,
    Reader:Reader,
    Register: Register
},
    {
        initialRouteName: 'Login',
        headerMode: 'none',

        navigationOptions:{
            headerVisible: false,
        }
    }
);
export default createAppContainer(App);
