import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity,Dimensions, TextInput } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default class Reader extends Component {
    state = {
        read: '',
        modeState: false,
        success: false,
        num : 0, 
    };
    onSuccess = async (e) => {
        await this.setState({read: e.data, success: true });
        if(this.state.read === ' '){
            alert ('Código Invalido')
        }else{
            this.props.navigation.navigate('Points', {leitura: this.state.read })
        }
    };
    onTextInsert = () =>{
        this.props.navigation.navigate ('Points', {leitura: this.state.read})
    }
    alterMode = () =>{
         if (this.state.modeState === true){
            this.setState({modeState: false});
          } else if (this.state.modeState === false){
              this.setState({modeState: true})
          }
      };
    render() {
        return (
            <View>
                <QRCodeScanner
                onRead={this.onSuccess}   
                cameraStyle={styles.cameraContainer}
                showMarker = {this.state.modeState === true ? (false): (true)}
                reactivate ={true}
                reactivateTimeout = {1000}
                checkAndroid6Permissions={true}
                fadeIn = {false}
                 />
                {this.state.modeState === true ? (
                    <View>
                        <TextInput
                            placeholder = {'CÓDIGO'}
                            autoCapitalize = 'characters'
                            placeholderTextColor = '#677D35'
                            style = {styles.inputCode}
                            onChangeText = {(read)=>this.setState({read})}
                            onSubmitEditing = {()=>this.onTextInsert()}
                        />
                    </View>                        
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
                </View>
            </View>            
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
        borderColor:'#677D35',
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
        borderColor:'#677D35',
        borderWidth: wp('0.3%'),
        justifyContent: 'center'
    },  
    txtScanMode:{
       alignItems: 'center',
       color: '#677D35'
    },
    inputCode:{
        fontSize: wp('5%'),
        alignSelf: 'center',
        marginTop: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#677d35',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('3%'),
        color: '#677d35'
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
