import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Picker } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import {FloatingAction} from 'react-native-floating-action'
import Icon2 from 'react-native-vector-icons/Feather'


export default class AddCupons extends Component {
  render() {
    return (
        <>
            <View style={{ marginHorizontal:wp('10%')}}>
            <View style ={{height:wp('10%')}}/>
                <TextField                    
                    ref={(input) => { this.email= input; }}
                    label = 'Nome do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'      
                    lineWidth = {2}
                    fontSize = {wp('4.5%')}
                />   
                <TextField
                    ref={(input) => { this.cpf = input; }}
                    label = 'Descrição do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)' 
                    lineWidth = {2}
                    fontSize = {17}
                    onChangeText = {trueCpf =>{this.setState({trueCpf})}}
                    onSubmitEditing={() => {this.showPicker()}}
                />      
                <TextField
                    ref={(input) => { this.password= input; }}
                    label = 'Código do Cupon'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}
                    onSubmitEditing={() => { this.phone.focus(); }}            
                />           
                <TextField
                    ref={(input) => { this.password= input; }}
                    label = 'Custo do Cupom'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    lineWidth = {2}
                    keyboardType = 'numeric'
                    maxLength = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}
                    onSubmitEditing={() => { this.phone.focus(); }}         
                />    
                <Button
                    type = 'outline'
                    title = 'Cadastrar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                /> 
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