import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ToastAndroid,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/Feather'
import {Button} from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import api from './services/api'
import LoadingScreen from './components/LoadingScreen';
import * as yup from 'yup'
import {Formik} from 'formik'

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
        alert("Cadastro não efetuado com sucesso, verifique seus dados")
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
        <Formik
          initialValues = {{companyName: '', cnpj:'', contact:'', address:'', ownerName:'', ownerCpf:'', password:'',representative:''}}
          validationSchema ={
            yup.object().shape({
              companyName: yup.string().required('Inisra o Nome da Empresa'),
              cnpj: yup.string().required('Insira um CNPJ').max(14).min(14),
              contact: yup.string().required('Insira um telefone'),
              address: yup.string().required('Insira o Indereço da Empresa'),
              ownerName: yup.string().required('Inisira o Nome do Dono'),
              ownerCpf: yup.string().required('Inisra o CPF do Dono').max(11).min(11),
              password: yup.string().required('Insira uma senha para a conta principal').min(6, 'Senha muito curta'),
              representative: yup.string().required('Inisra o Nome do Representante')
            })
          }
          onSubmit ={(values)=>{
            this.setState({
              companyName: values.companyName,
              cnpj: values.cnpj,
              contact: values.contact,
              address: values.address,
              ownerName: values.ownerName,
              ownerCpf: values.ownerCpf,
              password: values.password,
              representative: values.representative
            })
            this.Cadastra()
          }}
        >
        {({values, handleChange,errors, handleSubmit})=>(<View style = {styles.field}>
                <TextField
                  style={styles.input}
                  label = 'Nome da Empresa'
                  tintColor = 'rgba(1, 168, 62, 1)'
                  baseColor = 'rgba(1, 168, 62, 1)'
                  textColor = 'rgba(1, 168, 62, 1)'
                  lineWidth = {2}
                  fontSize = {17}
                  onSubmitEditing={() => { this.cnpj.focus(); }}
                  onChangeText = {handleChange('companyName')}
                  error ={errors.companyName}
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
                  onChangeText = {handleChange('cnpj')}
                  error= {errors.cnpj}
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
                  onChangeText = {handleChange('contact')}        
                  formatText={value => this._addMaskContactBr(value)}
                  error = {errors.contact}
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
                  onChangeText = {handleChange('address')}    
                  onSubmitEditing={() => { this.ownerName.focus(); }}  
                  error = {errors.address}
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
                  onChangeText = {handleChange('ownerName')}    
                  onSubmitEditing={() => { this.cpf.focus(); }}  
                  error= {errors.ownerName}
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
                  onChangeText = {handleChange('ownerCpf')}    
                  onSubmitEditing={() => { this.password.focus(); }}  
                  error= {errors.ownerCpf}
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
                  onChangeText = {handleChange('password')}    
                  renderRightAccessory = {this.renderPasswordAccessory}
                  onSubmitEditing={() => { this.representative.focus(); }}  
                  error= {errors.password}
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
                  onChangeText = {handleChange('representative')}    
                  error= {errors.representative}
                />  
              <View style= {styles.divider}/>
                <Button
                  type = 'outline'
                  title = 'Cadastrar'
                  titleStyle = {styles.btnLabel}
                  buttonStyle = {styles.btnLogin}
                  onPress = {handleSubmit}
                />                
              </View>   
               )}
          </Formik>
          <View style= {styles.divider}/>
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
