import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TextComponent,
  Alert
} from 'react-native';
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import {Button} from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import api from './services/api'
import LoadingScreen from './components/LoadingScreen';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.state = {
        isVisible: true,
        companyName:'',
        cnpj:'',
        contact: '',
        address:'',
        ownerName:'',
        ownerCpf:'',
        password: '',
        representative:'',
        load:false,
        secureTextEntry:true
    };
  }  
  Cadastra = async () => {
    if (this.state.companyName.length === 0 || this.state.cnpj.length === 0 || this.state.address.length === 0 || this.state.contact.length === 0 || this.state.ownerName.length === 0 || this.state.ownerCpf.length === 0 || this.state.password.length === 0 || this.state.representative.length === 0){
      ToastAndroid.showWithGravityAndOffset(
        'Para efetuar o cadastro, todos os campos devem ser preenchidos',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        200,
      );
    } else{       
      try{
        const response = await api.post('/companies',{
          nameCompany: this.state.companyName,
          cnpj: this.state.cnpj,
          address: this.state.address,
          contact: this.state.contact,
          nameOwner: this.state.ownerName,
          cpf: this.state.ownerCpf,
          password: this.state.password,
          representative: this.state.representative
        }) ;
          Alert.alert('Parabéns, seu cadastro foi efetuado com sucesso', 
          'Para efetuar login, utilize o CPF do Responsavel juntamente com a senha da conta principal'
          )
          console.log(response)
          this.props.navigation.navigate('Login')
      } catch (response){
        //this.setState({errorMessage: response.data.error });
        console.log(response)
        alert("Cadastro não efetuado com sucesso, virifique seus dados")
      }                     
    }   
  } 
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'eye':
      'eye-off';

    return (
      <Icon2 size={24} name={name}  color='#01A83E' onPress={this.onAccessoryPress}/>
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

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }
  render() {
  return (
    <>    
      <LoadingScreen enabled = {this.state.load}/>
      <View style = {{flexGrow:1, backgroundColor: '#01A83E', marginBottom: wp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: wp('4%'), color:'white', marginHorizontal: wp('9.5%')}}> Faça seu cadastro para se tornar um parceiro da iniciativa Qrup e fazer a diferença</Text>
      </View>
      <ScrollView style = {{ backgroundColor: "white"}}>         
            <View style = {styles.field}>
              <TextField
                style={styles.input}
                label = 'Nome da Empresa'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => { this.cnpj.focus(); }}
                onChangeText = {companyName =>{(this.setState({companyName}))}}
              />
              <TextField
                style={styles.input}
                ref={(input) => { this.cnpj= input; }}
                label = 'CNPJ da Empresa'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}              
                keyboardType = 'phone-pad'
                maxLength = {14}
                fontSize = {17}
                autoCapitalize ='none'
                onSubmitEditing={() => { this.phone.focus(); }}              
                onChangeText = {cnpj =>{(this.setState({cnpj}))}}
              />  
              <TextField
                style={styles.input}
                ref={(input) => { this.phone = input; }}
                label = 'Telefone'
                keyboardType = 'phone-pad'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => { this.endereco.focus(); }}          
                formatText={value => this._addMaskContactBr(value)}
              />            
              <TextField
                style={styles.input}
                ref={(input) => { this.endereco= input; }}
                label = 'Endereço da Empresa'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onChangeText = {address =>{this.setState({address})}}
                onSubmitEditing={() => { this.ownerName.focus(); }}  
              />        
              <TextField
                style={styles.input}
                ref={(input) => { this.ownerName= input; }}
                label = 'Nome do Dono'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onChangeText = {ownerName =>{this.setState({ownerName})}}
                onSubmitEditing={() => { this.cpf.focus(); }}  
              />      
              <TextField
                style={styles.input}
                ref={(input) => { this.cpf = input; }}
                label = 'CPF do Responsavel'
                keyboardType = 'phone-pad'
                maxLength={11}
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onChangeText = {ownerCpf =>{this.setState({ownerCpf})}}
                onSubmitEditing={() => { this.password.focus(); }}  
              />  
              <TextField
                style={styles.input}
                ref={(input) => { this.password= input; }}
                label = 'Senha da Conta Principal'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                secureTextEntry = {this.state.secureTextEntry}
                lineWidth = {2}
                autoCapitalize = 'none'
                fontSize = {17}            
                onChangeText = {password =>{(this.setState({password}))}}
                renderRightAccessory = {this.renderPasswordAccessory}
                onSubmitEditing={() => { this.representative.focus(); }}  
              />                          
            <TextField
                style={styles.input}
                ref={(input) => { this.representative= input; }}
                label = 'Nome do Representante'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onChangeText = {representative =>{this.setState({representative})}}
              />  
            </View>   
            <View style= {styles.divider}/>
            <Button
              type = 'outline'
              title = 'Cadastrar'
              titleStyle = {styles.btnLabel}
              buttonStyle = {styles.btnLogin}
              onPress = {()=>this.Cadastra()}
            /> 
      </ScrollView>  
  </>
  );
  }
};


const styles = StyleSheet.create({
    divider:{
      height: wp('5%')
    },
  text:{
     alignSelf:'center',
     fontSize: wp('9%'),
     fontFamily: 'roboto',
     color: 'white',
   },
   field:{
    color:'white',
    width: '80%',
    alignSelf: 'center',
  }, 
  
  btnLogin:{
    marginTop: wp('2%'),
    alignSelf: 'center',
    width: '40%',
    backgroundColor: '#01A83E',
  },
  btnLabel:{
    color:'white',
    fontSize: wp('5%'),
  }  
});
