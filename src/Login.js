import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Logo from '../Images/qrup_logo_sem_roda.png'
import imgLogin  from '../Images/btnLogin.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default class Login extends React.Component {
   Loga = () => {
    this.props.navigation.navigate('Points')
  } 
  register = () => {
    this.props.navigation.navigate('Register')
  } 
  render() {
  return (
    <>
  <StatusBar backgroundColor = "#677D35" barStyle="light-content" /> 
      <View style = {styles.main}>
        <Image source = {Logo} style={styles.Logo}/>
        <Text style={styles.text}> QRUP</Text>
        <Text style = {styles.company}>for Business</Text>
        <TextInput 
            style ={ styles.input}
            placeholder= {'Login'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
        <TextInput 
            style ={ styles.input}
            placeholder= {'Senha'}
            autoCapitalize = 'none'
            secureTextEntry = {true}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
        <View  style = {styles.buttonLogin}>                
            <TouchableOpacity onPress={() => this.Loga()} >
                <Image source = {imgLogin} style ={styles.btnImg}/>
            </TouchableOpacity>    
        </View>    
        <TouchableOpacity style = {styles.textMin1} onPress= {()=>{this.register()}}>
            <Text style={styles.txtStyle}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.textMin2}>Recupere Sua Senha</Text>
        </TouchableOpacity>

      </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#677D35',
    width : wp ('100%'),
    height: hp('100%'),
    alignContent: 'center',
    alignItems: 'center',
  },
text:{
    marginTop: wp('3%'),
   fontSize: wp('9%'),
   fontFamily: 'roboto',
   color: 'white',
 },
 textMin1:{
   //marginTop: wp('25%'),

 },
txtStyle:{
    color: 'white',
    fontSize: wp('4%'),
},  
 textMin2:{
  marginTop: wp('5%'),
  color: 'white',
  fontSize: wp('4%'),
},
 Logo:{
   width: wp('60%'),
   height:hp('30%'),
 },
 input:{
    fontSize: wp ('5%'),
    width: wp('85%'),
    color:'white',
//    marginBottom: wp
 },
 buttonLogin:{
    //width: wp('10%'),
    height: hp('15%'),
    marginLeft: hp('30%'),
    borderRadius: wp('10%'),
    //backgroundColor: 'white',
    alignContent: 'center',
    alignContent: 'flex-end',
    textAlignVertical: 'center',
    resizeMode: 'contain',
    marginBottom: wp('15%')
 },
 btnImg:{
    //marginStart: hp('30%'),
    //marginTop: wp('%'),
    //marginStart: wp('45%'),
    width: wp('25%'),
    height: hp('25%'),
    resizeMode: 'contain'
 },
 company:{
   color: 'white',
   marginStart: wp('30%'),
   marginTop: -wp('2%'),
   fontSize: wp('4%')
 }
});
