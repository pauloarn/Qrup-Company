import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Logo from '../Images/qrup_logo_sem_roda.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imgLogin  from '../Images/btnLogin.png'
import {TextInputMask} from 'react-native-masked-text';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
export default class Register extends React.Component {
   Login = () => {
    this.props.navigation.navigate('Login')
  }
  Cadastra = () => {
    this.props.navigation.navigate('User')
  } 
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        user:'',
        aux:'',
        cnpj:'',
        birhtDate: 'Nascimento',
        phoneBr: ''
    };
  }
  cpfChecker =()=>{        
    const cpfIsValid = this.cpfField.isValid()
    alert(cpfIsValid) // boolean
  }
  handlePicker =(date)=>{
    this.setState({
        isVisible: false,
        birhtDate: moment(date).format('DD/MM/YYYY')
    })
  }
  hidePicker =()=>{
    this.setState({
        isVisible: false       
    })
  }
    Cadastra =()=>{
    this.props.navigation.navigate('Points', {user: this.state.user})
  }
  showPicker =()=>{
    this.setState({
        isVisible: true
    })
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
              style ={ styles.input1}
              placeholder= {'Responsavel Juridico'}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              onChangeText={user =>{
                this.setState({
                  user
                })}
              }
          />
          <TextInput 
              style ={ styles.input}
              placeholder= {'E-mail'}
              autoCapitalize = 'none'
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/> 
          <TextInput 
              style ={ styles.input}
              placeholder= {'Senha'}
              secureTextEntry = {true}
              autoCapitalize = 'none'
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>    
          <TextInput 
              style ={ styles.input}
              placeholder= {'Confirme a senha'}
              secureTextEntry = {true}
              autoCapitalize = 'none'
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
          <TextInputMask
              type={'cel-phone'}
              value={this.state.phoneBR}
              placeholder ={'Telefone'}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              onChangeText={text => {
                this.setState({
                  phoneBR: text
                })
              }}
              style={styles.input}
          />  
          <TextInputMask
            type={'cnpj'}
            value={this.state.cnpj}
            placeholder = {'CNPJ'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            onChangeText={text => {
              this.setState({
                cnpj: text
              })
            }}
            style={styles.input}
          />
          <View  style = {styles.buttonLogin}>                
              <TouchableOpacity onPress={() => this.Cadastra()} >
                  <Image source = {imgLogin} style ={styles.btnImg}/>
              </TouchableOpacity>    
          </View> 
          <TouchableOpacity 
            style = {styles.textMin1}
            onPress = {()=> this.Login()}>
              <Text style = {styles.textMin2}>Login</Text>
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
    alignSelf: 'center',
    marginEnd: wp('5%'),
   width: wp('30%'),
   height:hp('15%'),
   resizeMode: 'contain'
 },
 input:{
    fontSize: wp ('5%'),
    width: wp('85%'),
    color:'white',
//    marginBottom: wp
 },
input1:{
  marginTop: wp('10%'),
  fontSize: wp ('5%'),
  width: wp('85%'),
  color:'white',
//    marginBottom: wp
},
eye:{
  flexDirection: 'row'
},
eyeIco:{
  fontSize: wp('8%'),
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
 birthDate1:{
    fontSize: wp ('5%'),
    width: wp('85%'),
    color:'white',
    borderBottomColor: 'white',
    borderBottomWidth: wp('0.3%')
 },
 birthDate2:{
     marginTop: wp('3%')
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
textMin1: {
  marginEnd: wp('65%'),
  marginTop: -hp('15%')
},
textMin2:{
 /* , */
  color: 'white',
  fontSize: wp('8%'),
},
company:{
  color: 'white',
  marginStart: wp('30%'),
  marginTop: -wp('2%'),
  fontSize: wp('4%')
}
});
