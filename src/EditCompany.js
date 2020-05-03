import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

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

export default class EditCompany extends Component {
    constructor (props){
        super(props);
        this.state={
            name:'',
            address:'',
            contact:'',
            CNPJ:'',
            avatar:''
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
        this.setState({
            name: await AsyncStorage.getItem('@QrupCompany:companyName'),
            address:await AsyncStorage.getItem('@QrupCompany:companyAddress'),
            contact: await AsyncStorage.getItem('@QrupCompany:companyContact'),
            CNPJ: await AsyncStorage.getItem('@QrupCompany:companyCNPJ'),
            avatar: await AsyncStorage.getItem('@QrupCompany:companyAvatar')
        })
    }
    async updateData(){
        try{
            const response = await api.put
        }catch(response){

        }
    }
    
  render() {
    return (
        <>
            <View style= {{ alignItems:'center', marginTop:wp('10%')}}>
                <Avatar
                    rounded
                    size= 'xlarge'
                    source ={{
                        uri : (api.defaults.baseURL + this.state.avatar)
                    }}
                    showEditButton
                    onPress={()=>this.selectPick()}
                />
            </View>
            <ScrollView>
                <View style={{marginHorizontal:wp('8%'), marginTop:wp('5%')}}>
                    <TextField
                        style={styles.input}
                        ref={(input) => { this.email= input; }}
                        label = 'Nome da Empresa'
                        defaultValue = {this.state.name}
                        tintColor = 'rgba(0, 0, 0, 1)'
                        baseColor = 'rgba(0, 0, 0, 1)'
                        lineWidth = {0}
                        fontSize = {wp('4.5%')}
                        onChangeText ={name => this.setState({name})}
                        renderRightAccessory = {this.renderAccessory}

                    />       
                    <TextField
                        style={styles.input}
                        ref={(input) => { this.address= input; }}
                        label = 'Endereço'
                        defaultValue = {this.state.address}
                        tintColor = 'rgba(0, 0, 0, 1)'
                        baseColor = 'rgba(0, 0, 0, 1)'
                        lineWidth = {0}
                        fontSize = {wp('4.5%')}
                        renderRightAccessory = {this.renderAccessory}
                        onChangeText ={address => this.setState({address})}
                    />        
                    <TextField
                        style={styles.input}
                        ref={(input) => { this.phone = input; }}
                        label = 'Telefone'
                        defaultValue = {this.state.contact}
                        keyboardType = 'phone-pad'
                        tintColor = 'rgba(0, 0, 0, 1)'
                        baseColor = 'rgba(0, 0, 0, 1)'
                        lineWidth = {0}
                        fontSize = {wp('4.5%')}   
                        renderRightAccessory = {this.renderAccessory}
                        onChangeText = {contact =>{(this.setState({contact}))}}         
                        formatText={value => this._addMaskContactBr(value)}
                    />       
                    <Text style = {{marginTop:wp('5%'), fontSize:wp('4.5%')}}>{this.state.CNPJ}</Text>
                </View>
                <Button
                    type = 'outline'
                    title = 'Salvar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                /> 
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
})
