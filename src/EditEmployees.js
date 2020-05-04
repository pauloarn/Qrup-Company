import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Picker } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextField } from 'react-native-material-textfield'
import { Button, Avatar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';

export default class EditCompany extends Component {
    constructor (props){
        super(props);
        this.state={
            name:'',
            role:'',
            funcao:'',
            id:'',
            load: false
        }
    }
    renderAccessory() {    
    return (
        <Icon size={24} name='pen'  color='darkgrey'/>
    );
    }
    _addMaskContactBr(contact){  
    try {
        contact =  contact.replace(/[^\d]+/g,'');
        this.setState({ contact: contact });
        if(contact.length == 10){
        contact = (contact.length > 1 ? "(" : "")+contact.substring(0, 2) + (contact.length > 2 ? ")" : "")+(contact.length > 2 ? " " : "") + contact.substring(2,6) + (contact.length > 3 ? "-" : "") + contact.substring(6, 10);
        } else {
        contact = (contact.length > 1 ? "(" : "")+contact.substring(0, 2) + (contact.length > 2 ? ")" : "")+(contact.length > 2 ? " " : "") + contact.substring(3,2) + (contact.length > 3 ? " " : "") + contact.substring(3, 7) + (contact.length > 7 ? "-" : "") + contact.substring(7, 12);
        }
    } catch(e){
        this.setState({ contact: contact });
    }
    return contact;
    }
    async componentDidMount(){        
        const employeeName = this.props.navigation.getParam('employeeName');
        const employeeRole = this.props.navigation.getParam('employeeRole');
        const employeeId = this.props.navigation.getParam('employeeId');
        this.setState({
            name: employeeName,
            role: employeeRole,
            id: employeeId
        })
        console.log(employeeRole)
        if (employeeRole == 1){
            this.setState({funcao: 'Dono da Empresa'})
        } else if(employeeRole ==2){
            this.setState({funcao:'Gerente da Empresa'})
        } else if(employeeRole == 3){
            this.setState({funcao: 'Funcionário'})
        }
    }
    async updateData(){  
        this.setState({load:true})        
        try{
            const response = await api.put('/companies/'+ await AsyncStorage.getItem('@QrupCompany:companyid')+'/employees/'+this.state.id,{    
                name: this.state.name,
                role: this.state.role,
              },
              {
                headers:{
                  Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                }
              }
            )
            /*await AsyncStorage.setItem('@QrupCompany:companyName',response.data.name) 
            await AsyncStorage.setItem('@QrupCompany:companyAddress',response.data.address)
            await AsyncStorage.setItem('@QrupCompany:companyContact',response.data.contact) */
            ToastAndroid.showWithGravityAndOffset(
                'Dados Atualizados com Sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );
            this.props.navigation.navigate('Employees')  
            this.setState({load:false})
        }catch(response){              
            this.setState({load:false})
            console.log(response)
            ToastAndroid.showWithGravityAndOffset(
                'Problemas para Atualizar dados da empresa',
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
            <View style= {{ alignItems:'center', marginTop:wp('10%')}}>
            </View>
            <ScrollView>
                <View style={{marginHorizontal:wp('8%'), marginTop:wp('20%')}}>
                    <TextField
                        style={styles.input}
                        ref={(input) => { this.email= input; }}
                        label = 'Nome do Funcionário'
                        defaultValue = {this.state.name}
                        tintColor = 'rgba(0, 0, 0, 1)'
                        baseColor = 'rgba(0, 0, 0, 1)'
                        lineWidth = {0}
                        fontSize = {wp('4.5%')}
                        onChangeText ={name => this.setState({name})}
                        renderRightAccessory = {this.renderAccessory}

                    />       
                    <Text>Cargo Atual do Funcionário: {this.state.funcao}</Text>
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
                    <Text style = {{marginTop:wp('5%'), fontSize:wp('4.5%')}}>{this.state.CNPJ}</Text>
                </View>
                <View style = {{height:hp('23%')}}/>
                <Button
                    type = 'outline'
                    title = 'Salvar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.updateData()}
                /> 
                <View style ={{alignSelf: 'center',flexDirection: 'row', marginTop:wp('3%')}}>
                    <Text style ={{color: 'black',fontSize: wp('4,85409%'),	textAlign: "center",marginBottom: 20}}>Quer trocar a senha? </Text>
                    <TouchableOpacity 
                        onPress = {()=>this.props.navigation.navigate('EditPassword')}>
                    <Text style={styles.txtStyle}>pressione aqui</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
  }
}


const styles = StyleSheet.create({
    editText: {
        flex: 1,
        fontSize:wp('5%'),
        color:'black',
        paddingVertical: 5,
        textAlign: "left",
        marginLeft: 10,
    },

    editTextEnabled: {
        flex: 1,
        fontSize:wp('5%'),
        color:'black',
        textAlignVertical:'center',
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5
    },
    btnLogin:{
        marginTop: wp('20%'),
        borderRadius: wp('2%'),
        alignSelf: 'center',
        width: '40%',
        backgroundColor: '#01A83E',
    },
    btnLabel:{
        color:'white',
        fontSize: wp('5%'),
    },
    txtStyle:{
        color: '#01A83E',
        fontSize: wp('4,85409%'),
        textAlign: "center",
        marginBottom: 20,
        textDecorationLine: 'underline',
    }, 
})
