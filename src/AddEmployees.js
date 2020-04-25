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

export default class src extends Component {
    constructor(props) {
        super(props);
    
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.state = {
            secureTextEntry: true,
            role:''
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
  render() {
    return (
        <>
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
                    renderRightAccessory = {this.renderAccessory}
                />   
                <View style={{borderColor:'black', borderWidth:wp('0.5%'), marginTop:wp('3%'), borderRadius:wp('1%')}}>                                                  
                    <Picker
                        style = {{width:wp('80')}}
                        selectedValue={this.state.role}
                        mode='dropdown'
                        onValueChange={(itemValor, itemIndex)=> this.setState({role:itemValor})}
                    >
                        <Picker.item label = 'Cargo ' value= ''/>
                        <Picker.item label = 'Gerente' value= 'Gerente'/>
                        <Picker.item label = 'Funcionário' value= 'Funcionário'/>
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
                    fontSize = {17}
                    onChangeText = {trueCpf =>{this.setState({trueCpf})}}
                    onSubmitEditing={() => {this.showPicker()}}
                />      
                <TextField
                    ref={(input) => { this.password= input; }}
                    label = 'Senha do Funcionário'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}
                    onSubmitEditing={() => { this.phone.focus(); }}            
                    renderRightAccessory = {this.renderPasswordAccessory}
                />           
                <TextField
                    ref={(input) => { this.password= input; }}
                    label = 'Confirme sua Senha'
                    tintColor = 'rgba(0, 0, 0, 1)'
                    baseColor = 'rgba(0, 0, 0, 1)'   
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {wp('4.5%')}
                    onSubmitEditing={() => { this.phone.focus(); }}            
                    renderRightAccessory = {this.renderPasswordAccessory}
                />    
                <Button
                    type = 'outline'
                    title = 'Salvar'
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