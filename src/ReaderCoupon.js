import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity,Dimensions, TextInput, ScrollView, ToastAndroid } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'; 
 import api from './services/api';
export default class Reader extends Component {
    state = {
        modeState: false,
        num : 0, 
        descryption: 'copo do dakkee',
        type: '550ml',
        qr:'',
        user_id:'',
        token: ''
    };
    
    async componentDidMount(){
        this.setState ({
            user_id:  await AsyncStorage.getItem('@QrupCompany:id'),
            token: await AsyncStorage.getItem('@QrupCompany:token')
        }) 
    };
    onSuccess = async (e) => {
        await this.setState({qr: e.data});
            this.setState({load:true})
            try{
              const response = await api.post('/employees/'+await AsyncStorage.getItem('@QrupCompany:employeeId')+'/reads',{
                coupon_and_user: this.state.qr,
                type:'take'
              },
              {
                  headers:{
                      Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                  }
              }) ;
              this.setState({load:false})
              this.props.navigation.navigate('Profile')
              ToastAndroid.showWithGravityAndOffset(
                'Cupom válido',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
            } catch (response){
              //this.setState({errorMessage: response.data.error });     
              let error = response.response.data;   
              this.props.navigation.navigate('Qrup')
              if (error = 'You dont have enough points'){
                ToastAndroid.showWithGravityAndOffset(
                    'Usuário não possiu pontos suficientes',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    200,
                  );
              }else {
                ToastAndroid.showWithGravityAndOffset(
                    'Cupom Invalido',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    200,
                  );
              }              
            }                        
    };
    async componentDidMount(){
        this.setState ({
            user_id:  await AsyncStorage.getItem('@Qrup:u_id'),
            token: await AsyncStorage.getItem('@Qrup:token')
        }) 
    };
    /*async onTextInsert  () {
        if (this.state.read.length === 0 ){
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
                coupon_and_user: this.state.read,
                type:'take'
              },
              {
                  headers:{
                      Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                  }
              }) ;
              
              this.setState({load:false})
              this.props.navigation.navigate('Profile')
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
    }*/
    alterMode = () =>{
         if (this.state.modeState === true){
            this.setState({modeState: false});
          } else if (this.state.modeState === false){
              this.setState({modeState: true})
          }
      };
    render() {
        return (
            <>
                <QRCodeScanner
                    onRead={this.onSuccess}   
                    cameraStyle={styles.cameraContainer}
                    showMarker = {this.state.modeState === true ? (false): (true)}
                    reactivate ={true}
                    reactivateTimeout = {1000}
                    checkAndroid6Permissions={true}
                    fadeIn = {false}
                />
                {/*this.state.modeState === true ? (
                    <ScrollView>
                        <TextInput
                            placeholder = {'CÓDIGO'}
                            autoCapitalize = 'characters'
                            placeholderTextColor = '#01A83E'
                            style = {styles.inputCode}
                            onChangeText = {(read)=>this.setState({read})}
                            onSubmitEditing = {()=>this.onTextInsert()}
                        />
                    </ScrollView>                        
                ):(
                    <View></View>
                )}
                <View style = {this.state.modeState === true ? (styles.selModeN) : (styles.selMode)}>    
                    <TouchableOpacity style = {this.state.modeState === true ? (styles.scanModeN) : (styles.scanModeSel)}
                                    onPress = {this.alterMode}>
                        <Text style={styles.txtScanMode}>SCAN CODE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {this.state.modeState === false ? (styles.enterModeN) : (styles.enterModeSel)}
                                    onPress = {this.alterMode}  >
                        <Text style = {styles.txtScanMode}>ENTER CODE</Text>
                    </TouchableOpacity>
                </View>*/}  
            </>        
            
        );
    }
}

const styles = StyleSheet.create({
    cameraContainer: {
        height: Dimensions.get('window').height,
    },
    texto:{
        color: 'red',
        alignSelf: 'center',
        marginTop: wp('20%'),
        fontSize: wp('15%')
    },
    selMode:{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: hp('73%'),
        backgroundColor: '#BCB4B4',
        height: hp('7%'),
        width: wp('60%'),
        alignItems:'center',
        borderRadius: wp('3%')
    },
    selModeN:{        
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: hp('20%'),
        backgroundColor: '#BCB4B4',
        height: hp('7%'),
        width: wp('60%'),
        alignItems:'center',
        borderRadius: wp('3%')
    },  
    scanModeN:{
        marginStart: wp('1%'),
        alignContent: 'center',
        alignItems: 'center',
        height: hp('5%'),
        width: wp('28%'),  
        justifyContent: 'center'        
    },
    scanModeSel:{
        marginStart: wp('1%'),
        backgroundColor: '#FFFFFF',
        height: hp('6.5%'),
        width: wp('28%'),
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: wp('3%'),
        borderColor:'#01A83E',
        borderWidth: wp('0.3%'),
        justifyContent: 'center'
        
    },
    enterModeN:{
        marginEnd: wp('1%'),
        height: hp('6%'),
        width: wp('28%'),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterModeSel:{
        marginEnd: wp('1%'),
        backgroundColor: '#FFFFFF',
        height: hp('6.5%'),
        width: wp('28%'),
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: wp('3%'),
        borderColor:'#01A83E',
        borderWidth: wp('0.3%'),
        justifyContent: 'center'
    },  
    txtScanMode:{
       alignItems: 'center',
       color: '#01A83E'
    },
    inputCode:{
        fontSize: wp('5%'),
        alignSelf: 'center',
        marginTop: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#01A83E',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('3%'),
        color: '#01A83E'
    },
    terteBtn:{
        //backgroundColor: 'red',
        marginTop: hp('5%'),
        marginLeft: wp('75%')
    },
    check:{
        fontSize: wp('20%')
    },
})
