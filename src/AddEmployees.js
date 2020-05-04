import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Picker, ToastAndroid } from 'react-native';
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

export default class src extends Component {
    constructor(props) {
        super(props);
    
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.state = {
            secureTextEntry: true,
            name:'',
            cpf:'',
            password:'',
            confirmPassword:'',
            role:'',
            load: false

        }
    }    
    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry?
            'eye':
            'eye-off';

        return (
            <Icon2 size={24} name={name}  color='black' onPress={this.onAccessoryPress}/>
        );
    }
    
    onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
    async addEmployee(){
        if (this.state.name.length === 0 || this.state.cpf.length === 0 || this.state.password.length === 0 || this.state.role.length === 0 || this.state.confirmPassword.length === 0){
            ToastAndroid.showWithGravityAndOffset(
                'Para cadastrar novo usuário, todos os campos devem ser preenchidos',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        } else if (this.state.password != this.state.confirmPassword){
            ToastAndroid.showWithGravityAndOffset(
                'As senhas fornecidas não combinam',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        } else {                
            this.setState({load:true})
            try{
                const response = await api.post('/companies/'+await AsyncStorage.getItem('@QrupCompany:companyid')+'/employees',{
                    name:this.state.name,
                    cpf:this.state.cpf,
                    password:this.state.password,
                    role:this.state.role
                },{
                    headers:{
                        Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                    }
                })
                ToastAndroid.showWithGravityAndOffset(
                    'Funcionário cadastrado com Sucesso',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    200,
                  );
                  this.props.navigation.navigate('Employees')
                this.setState({load:false})
            }catch(response){
                ToastAndroid.showWithGravityAndOffset(
                    'Problemas para cadastrar funcionário',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    200,
                );
            }
        }
    }
  render() {
    return (
        <>
            <LoadingScreen enabled = {this.state.load}/>
            <ScrollView>
            <View style = {{height: wp('20%'), width: wp('20%'), borderRadius:wp('10%'),marginTop:wp('10%'), backgroundColor:'white',  alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                <View style = {{height: wp('18%'), width: wp('18%'), borderRadius:wp('10%'), borderColor: '#01A83E', borderWidth:wp('1%'),  alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                    <Icon name = 'user' size = {wp('10%')} color='#01A83E'/>
                </View>
            </View>
            <View style={{ marginHorizontal:wp('10%')}}>
                <TextField                    
                    ref={(input) => { this.email= input; }}
                    label = 'Nome do Funcionário'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'      
                    lineWidth = {2}
                    fontSize = {wp('4.5%')}
                    onChangeText = {name =>{this.setState({name})}}
                />   
                <View style={{borderColor:'black', borderWidth:wp('0.5%'), marginTop:wp('3%'), borderRadius:wp('1%')}}>                                                  
                    <Picker
                        style = {{width:wp('80')}}
                        selectedValue={this.state.role}
                        mode='dropdown'
                        onValueChange={(itemValor, itemIndex)=> this.setState({role:itemValor})}
                    >
                        <Picker.item label = 'Cargo' value= ''/>
                        <Picker.item label = 'Dono' value= '1'/>
                        <Picker.item label = 'Gerente' value= '2'/>
                        <Picker.item label = 'Funcionário' value= '3'/>
                    </Picker>
                </View>
                <TextField
                    ref={(input) => { this.cpf = input; }}
                    label = 'CPF'
                    keyboardType = 'phone-pad'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)' 
                    lineWidth = {2}
                    maxLength= {11}
                    fontSize = {wp('4%')}
                    onChangeText = {cpf =>{this.setState({cpf})}}
                    onSubmitEditing={() => { this.password.focus(); }}     
                />      
                <TextField
                    ref={(input) => { this.password= input; }}
                    label = 'Senha do Funcionário'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4%')}
                    onSubmitEditing={() => { this.confirmPassword.focus(); }}       
                    onChangeText = {password =>{this.setState({password})}}     
                    renderRightAccessory = {this.renderPasswordAccessory}
                />           
                <TextField
                    ref={(input) => { this.confirmPassword= input; }}
                    label = 'Confirme sua Senha'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4%')}
                    onChangeText = {confirmPassword =>{this.setState({confirmPassword})}}        
                    renderRightAccessory = {this.renderPasswordAccessory}
                />    
                <Button
                    type = 'outline'
                    title = 'Salvar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress={()=>{this.addEmployee()}}
                /> 
            </View>
            </ScrollView>
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