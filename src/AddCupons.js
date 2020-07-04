import React, { Component } from 'react';

import { View, StyleSheet, Text, ScrollView, ToastAndroid } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import {FloatingAction} from 'react-native-floating-action'
import Icon2 from 'react-native-vector-icons/Feather'
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';


export default class AddCupons extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            name:'',
            description:'',
            points:'',
            code:'',
            load:false
        };
    }
    async addCupons(){
        this.setState({load:false})
        try{
            const response= await api.post('/companies/'+await AsyncStorage.getItem('@QrupCompany:companyid')+'/coupons',{
                    name: this.state.name,
                    description: this.state.description,
                    points: this.state.points,
                    code: this.state.code
                },
                {
                    headers:{
                        Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                    }
            })
            ToastAndroid.showWithGravityAndOffset(
                'Novo Cupon adicionado',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );
            this.setState({load:false})
            this.props.navigation.navigate('Cupons')
        }catch(response){
            this.setState({load:false})
            ToastAndroid.showWithGravityAndOffset(
                'Problema para adicionar cupons',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        }
    }
  render() {
    return (
        <>
            <LoadingScreen enabled = {this.state.load}/>
            <View style ={{flex:1, backgroundColor:'#f5f5f5'}}>
            <View style={{ marginHorizontal:wp('10%')}}>
            <View style ={{height:wp('10%')}}/>
                <TextField                    
                    ref={(input) => { this.email= input; }}
                    label = 'Nome do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'      
                    lineWidth = {2}
                    fontSize = {wp('4.5%')}
                    onChangeText = {name =>{this.setState({name})}}
                    onSubmitEditing={() => { this.description.focus(); }}      
                />   
                <TextField
                    ref={(input) => { this.description = input; }}
                    label = 'Descrição do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)' 
                    lineWidth = {2}
                    fontSize = {17}
                    onChangeText = {description =>{this.setState({description})}}
                    onSubmitEditing={() => { this.code.focus(); }}      
                />      
                <TextField
                    ref={(input) => { this.code= input; }}
                    label = 'Código do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}
                    onChangeText = {code =>{this.setState({code})}}
                    onSubmitEditing={() => { this.points.focus(); }}            
                />           
                <TextField
                    ref={(input) => { this.points= input; }}
                    label = 'Custo do Cupom'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    lineWidth = {2}
                    keyboardType = 'numeric'
                    maxLength = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}    
                    onChangeText = {points =>{this.setState({points})}}
                />    
                <Button
                    type = 'outline'
                    title = 'Cadastrar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress={()=>{this.addCupons()}}
                /> 
            </View>
            </View>
        </>
    );
  }
}
const styles = StyleSheet.create({
    btnLogin:{
        marginTop: wp('10%'),
        borderRadius: wp('2%'),
        alignSelf: 'center',
        width: wp('40%'),
        height:wp('10%'),
        backgroundColor: '#01A83E',
    },
    btnLabel:{
        color:'white',
        fontSize: wp('5%'),
    },
})