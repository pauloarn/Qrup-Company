import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Points from './Points';
import ReaderCup from './ReaderCup';
import ReaderCoupon from './ReaderCoupon'
import Register from './Register'
import Profile from './Profile'
import Employees from './Employees'
import AddEmployees from './AddEmployees'
import EditCompany from './EditCompany';
import CompanyCupons from './CompanyCupons'
import AddCupons from './AddCupons'
import EditPassword from './EditPassword'
import EditEmployees from './EditEmployees'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const User = createStackNavigator(
  {
    Profile :{
      screen: Profile,
      navigationOptions:{
        headerVisible: false,
        headerShown: false
      }
    },
    EditCompany: {
      screen: EditCompany,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Empresa',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    Employees:{
      screen: Employees,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Funcionários',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    AddEmployees:{
      screen: AddEmployees,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Adicionar Funcionários',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    EditEmployees:{
      screen: EditEmployees,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Editar Funcionário',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    EditPassword:{
      screen: EditPassword,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Editar Senha',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    Cupons:{
      screen: CompanyCupons,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Cupons',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    AddCupons:{
      screen: AddCupons,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Adicionar Cupons',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    ScanCup:{
      screen: ReaderCup,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Escanear Copo',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    },
    ScanCupon:{
      screen: ReaderCoupon,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Escanear Cupon',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('5%'),
          marginLeft: -wp('5%')
        },
      }
    }
  },{
    initialRouteName:'Profile'
  }
)
const Main = createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions:{
          headerVisible: false,
          headerShown: false
        }
      },
      Register: {
        screen: Register,
        navigationOptions:{
          headerTintColor: 'white',
          title: 'Cadastro',
          headerStyle:{
            backgroundColor: '#01A83E',
            elevation: 0,
          },
          headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
          headerTitleContainerStyle:{
            justifyContent:'center'
          },
          headerTitleStyle: {
            fontSize: wp('7%'),
            marginLeft: -wp('5%')
          },
        }
      },
    },{
      initialRouteName: 'Login',
      
    }  
  );

export default createAppContainer (
    createSwitchNavigator({
      Login: Main,
      User: User
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none',
      navigationOptions: {
       headerVisible: false,
      }
    }
    )
);