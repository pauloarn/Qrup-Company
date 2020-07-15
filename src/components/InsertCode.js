import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, ToastAndroid, Alert} from 'react-native'
import {Button} from 'react-native-elements'
import Icon2 from  'react-native-vector-icons/MaterialIcons'
import {FloatingAction} from 'react-native-floating-action'
import AsyncStorage from '@react-native-community/async-storage'  
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
import api from '../services/api';
import LoadingScreen from './LoadingScreen';


export default class InsertCode extends Component {    
    constructor(props) {
        super(props);    
        this.state = {
            load:false,
            qr:''
        };
    }
    async newRead(){
        if (this.state.qr.length === 0 ){
            ToastAndroid.showWithGravityAndOffset(
                'Ensira o Código do Copo',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
          } else{ 
            this.setState({load:true})
            try{
              const response = await api.post('/employees/'+await AsyncStorage.getItem('@QrupCompany:employeeId')+'/reads',{
                qr: this.state.qr,
                type:'read'
              },
              {
                  headers:{
                      Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                  }
              }) ;
              
              this.setState({load:false})
              ToastAndroid.showWithGravityAndOffset(
                'Leitura Efetuada',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
              
            } catch (response){
              //this.setState({errorMessage: response.data.error });     
              console.log(response)   
              this.props.navigation.navigate('Qrup')
              ToastAndroid.showWithGravityAndOffset(
                'Copo não Vinculado a Usuário',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
            }                        
          } 
    }
    render(){
        return(
                <Modal
                    transparent = {true}
                    visible = {this.props.visible}
                >
                <LoadingScreen enabled = {this.state.load}/>
                <View style = {styles.insertCode}>                            
                    <TextInput
                        placeholder = {'Insira o Código do Qrup'}
                        autoCapitalize = 'none'
                        placeholderTextColor = '#006300'
                        style = {styles.inputCode}
                        onChangeText = {(qr)=>this.setState({qr})}
                        onSubmitEditing = {()=>this.onTextInsert()}
                    />                      
                    <View style = {styles.buttons}>
                        <Button
                            type = "solid"
                            title = "Cancel"                                    
                            buttonStyle = {styles.btn}
                            onPress = {this.props.alterMode}
                        />
                        <Button
                            type = "solid"
                            title = "Ok"
                            buttonStyle = {styles.btn}
                            onPress = {()=> this.newRead()}
                        />
                    </View>
                </View>
            </Modal>       
        )
    }

}
const styles = StyleSheet.create({
    insertCode:{
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: -wp('5%')
    },
    inputCode:{
        fontSize: wp('3%'),
        alignSelf: 'center',
        //marginTop: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#006300',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('1%'),
        color: '#006300'
    },
    btn:{
        marginTop: wp('4%'),
        backgroundColor: '#006300',
        width: wp('20%'),
		alignSelf: 'center'
    }, 
    buttons:{
        //backgroundColor: 'rgba(68, 68, 68, 0.6)',
        width: wp('55%'),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
})