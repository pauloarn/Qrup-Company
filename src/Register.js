import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button} from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
//import api from './services/api'
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        user:'Bolo',
        email: 'Bolo@decalça.com',
        cpf:'00000000000',
        birhtDate: '18/05/1995',
        password: 'Datebayo',
        contact: '651951'
    };
  }  
  Login = () => {
    this.props.navigation.navigate('Login')
  }
  Cadastra = async () => {
    if (this.state.user.length === 0 || this.state.password.length === 0 || this.state.email.length === 0 || this.state.cpf.length === 0 || this.state.contact.length === 0 ){
      alert('Campo Vazio')
    } else{       
      alert("Cadastro efetuado com sucesso"),
      this.props.navigation.navigate('Login');
    /*console.log('SICARALHO')   
      try{
        const response = await api.post('/users',{
          email: this.state.email,
          password: this.state.password,
          name: this.state.user,
          cnpj: this.state.cpf,
          birth: this.state.birhtDate,
          contact: this.state.contact
        }) ;
          alert('Cadastro Efetuado com Sucesso')
          this.props.navigation.navigate('Login')
      } catch (response){
        //this.setState({errorMessage: response.data.error });
        console.log(response)
        alert("Cadastro não efetuado com sucesso, virifique seus dados")
      }  */                      
    }   
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
  showPicker =()=>{
    this.setState({
        isVisible: true
    })
  }
  render() {
  return (
      <ScrollView style = {{ backgroundColor: "#006300"}}>
        <View style = {styles.main}>
            <TouchableOpacity style = {{marginLeft: wp('5%'), marginTop: wp('5%')}} onPress={()=>this.props.navigation.navigate('Login')}>
              <Icon name = "md-arrow-round-back" color = "white" size = {wp('10%')}/>
            </TouchableOpacity>           
          <Image source = {Logo} style={styles.Logo}/>
          <Text style={styles.text}> QRUP</Text>          
          <Text style = {styles.company}>for Business</Text>
          <View style = {styles.field}>
            <TextField
              style={styles.input}
              label = 'Responsavel Jurídico'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.email.focus(); }}
              onChangeText = {user =>{(this.setState({user}))}}
            />
            <TextField
              style={styles.input}
              ref={(input) => { this.email= input; }}
              label = 'Company E-mail'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.password.focus(); }}              
              onChangeText = {email =>{(this.setState({email}))}}
            />            
            <TextField
              style={styles.input}
              ref={(input) => { this.password= input; }}
              label = 'Password'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              secureTextEntry = {true}
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.phone.focus(); }}              
              onChangeText = {password =>{(this.setState({password}))}}
            />
            {/*<TextField
              style={styles.input}
              ref={(input) => { this.confirm= input; }}
              label = 'Confirme sua Senha'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              secureTextEntry = {true}
              fontSize = {17}
              onSubmitEditing={() => { this.phone.focus(); }}
            /> */} 
            <TextField
              style={styles.input}
              ref={(input) => { this.phone = input; }}
              label = 'Telefone'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.cpf.focus(); }}                
              onChangeText = {contact =>{(this.setState({contact}))}}
            />            
            <TextField
              style={styles.input}
              ref={(input) => { this.cpf = input; }}
              label = 'CNPJ'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => {this.showPicker()}}
              onChangeText = {cnpj =>{(this.setState({cnpj}))}}
            />             
           { /*<TextField
              style={styles.input}
              ref={(input) => { this.birth = input; }}
              onFocus = {() => {this.showPicker}}
              label = 'Nascimento'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.cpf.focus(); }}
           /> */}
            {/*<TouchableOpacity 
                style ={styles.birthDate2}
                onPress ={()=>this.showPicker()} >
                <Text
                    style ={ styles.birthDate1}>
                        {this.state.birhtDate}
                </Text>
            </TouchableOpacity>
            <Button
              type = 'outline'
              title = {this.state.birhtDate}
              titleStyle = {styles.birthDate1}
              buttonStyle = {styles.birthDate2}
              onPress = {()=>this.showPicker()}
            />
            <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode = {'date'}
            />   */}
          </View>
          <View style= {styles.divider}/>
          <Button
            type = 'outline'
            title = 'Cadastrar'
            titleStyle = {styles.btnLabel}
            buttonStyle = {styles.btnLogin}
            onPress = {()=>this.Cadastra()}
          /> 
        </View>
      </ScrollView>
  );
  }
};


const styles = StyleSheet.create({
  divider:{
    height: wp('5%')
  },
  main: {
    backgroundColor: '#006300',
    flex:1
  },
text:{
   alignSelf:'center',
   fontSize: wp('9%'),
   fontFamily: 'roboto',
   color: 'white',
 },
 company:{
  color: 'white',
  //marginStart: wp('20%'),
  alignSelf:'center',
  marginTop: -wp('2%'),
  fontSize: wp('4%')
},
 field:{
  color:'white',
  width: '80%',
  alignSelf: 'center',
}, 
 Logo:{  
   alignSelf: 'center',
   width: wp('20%'),
   height:hp('15%'),
   resizeMode: 'contain'
 },
 input: {
  marginTop: 2
},
 btnImg:{
    //marginStart: hp('30%'),
    //marginTop: wp('%'),
    //marginStart: wp('45%'),
    width: wp('25%'),
    height: hp('25%'),
    resizeMode: 'contain'
 },
 birthDate2:{
     marginTop: wp('3%'),
     justifyContent : 'flex-start',
     borderBottomColor: 'white',
     borderBottomWidth: 2,
     borderWidth: 0,
 },
 birthDate1:{
   color: 'white',
   alignItems:'flex-start',
   justifyContent:'flex-start'
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
//  marginEnd: wp('65%'),
  //marginTop: hp('15%')
},
textMin2:{
 /* , */
  color: 'white',
  fontSize: wp('8%'),
},
btnLogin:{
  marginTop: wp('5%'),
  alignSelf: 'center',
  width: '80%',
  backgroundColor: 'white',
},
btnLabel:{
  color:'#006300',
  fontSize: wp('5%'),
},
});
