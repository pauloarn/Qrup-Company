import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {Button} from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from '../Images/qrup_semroda_semsombra.png'
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';
import Icon from 'react-native-vector-icons/Feather'

export default class Login extends React.Component {  
  constructor(props) {
    super(props);    
    
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.state = {
        login:'',
        password:'',
        errorMessage: null,
        load: false,        
        secureTextEntry: true      
    };
  }
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@QrupCompany:token')
    if (user){
      this.props.navigation.navigate('User')
    }
  }    
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'eye':
      'eye-off';

    return (
      <Icon size={24} name={name}  color='white' onPress={this.onAccessoryPress}/>
    );
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }
  Loga = async() => {
  if (this.state.login.length === 0 || this.state.password.length === 0 ){
      alert('Campo Vazio')
    } else{ 
      this.setState({load:true})
        try{
          const response = await api.post('/sessions',{
            cpf: this.state.login,
            password: this.state.password,
            type: 'employee'
          }) ;
            await AsyncStorage.setItem('@QrupCompany:companyid',response.data.employee.company[0].company_id)       
            this.loginAgain()
            console.log(response.data.employee.company[0].company_id)
        } catch (response){
          this.setState({load:false})
          //this.setState({errorMessage: response.data.error });      
          console.log(response);  
          ToastAndroid.showWithGravityAndOffset(
            'Credenciais não conferem',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200,
          );
        }                     
    }   
  }

  async loginAgain(){
    try{
      const response = await api.post('/sessions',{
        cpf: this.state.login,
        password: this.state.password,
        company_id:await AsyncStorage.getItem('@QrupCompany:companyid'),
        type: 'employee'
      }) ;
        await AsyncStorage.setItem('@QrupCompany:token',response.data.token)    
        await AsyncStorage.setItem('@QrupCompany:companyid',response.data.employee.company[0].company_id)        
        await AsyncStorage.setItem('@QrupCompany:name',response.data.employee.name)     
        await AsyncStorage.setItem('@QrupCompany:role',JSON.stringify(response.data.employee.role))
        await AsyncStorage.setItem('@QrupCompany:employeeId',JSON.stringify(response.data.employee.id))
        await AsyncStorage.setItem('@QrupCompany:companyName',response.data.employee.company[0].company[0].name)          
        await AsyncStorage.setItem('@QrupCompany:companyAddress',response.data.employee.company[0].company[0].address)
        await AsyncStorage.setItem('@QrupCompany:companyAvatar',response.data.employee.company[0].company[0].avatar_id)      
        await AsyncStorage.setItem('@QrupCompany:companyCNPJ',response.data.employee.company[0].company[0].cnpj)      
        await AsyncStorage.setItem('@QrupCompany:companyContact',response.data.employee.company[0].company[0].contact)  
        console.log(response.data.employee.company[0].company_id)        
        this.setState({load:false})
        this.props.navigation.navigate('User')
    } catch (response){
      this.setState({load:false})
      //this.setState({errorMessage: response.data.error });      
      console.log(response);  
    }                  
  }
  Cadastra = () =>{
    this.props.navigation.navigate('Register')
  }
  render() {
  return (
    <>        
      <LoadingScreen enabled = {this.state.load}/>
            <View style = {styles.main}>
              <Image source = {Logo} style={styles.Logo}/>
              <Text style={styles.text}>QRUP</Text>              
              <Text style = {styles.company}>for Business</Text>
              <View style = {styles.field}>
                <TextField
                  style={styles.input}
                  label = 'CPF do Usuário'
                  tintColor = 'rgb(255,255,255)'
                  baseColor = 'rgba(255,255,255,1)'
                  textColor = 'rgba(255,255,255,1)'
                  lineWidth = {2}
                  maxLength= {11}
                  fontSize = {17}
                  onSubmitEditing={() => { this.password.focus(); }}
                  onChangeText = {login =>{(this.setState({login}))}}
                />
                <TextField 
                  style={styles.input}    
                  ref={(input) => { this.password = input; }}
                  label = 'Senha'
                  tintColor = 'rgb(255,255,255)'
                  baseColor = 'rgba(255,255,255,1)'
                  textColor = 'rgba(255,255,255,1)'
                  secureTextEntry= {this.state.secureTextEntry}
                  keyboardType = 'twitter'
                  lineWidth = {2}                    
                  fontSize = {17}
                  onSubmitEditing = {() => {this.Loga()}}
                  onChangeText = {password =>{(this.setState({password}))}}
                  renderRightAccessory = {this.renderPasswordAccessory}                
                />
              </View>
              <Button
                    type = 'outline'
                    title = 'Acessar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Loga()}
                /> 
                <View style={styles.footer}>
                  <View style ={{flexDirection: 'row'}}>
                    <Text style ={{color: 'white',fontSize: wp('4,85409%'),	textAlign: "center",marginBottom: 20}}>Novo por aqui? </Text>
                    <TouchableOpacity 
                        onPress = {()=>this.Cadastra()}>
                      <Text style={styles.txtStyle}>pressione aqui</Text>
                    </TouchableOpacity>
                  </View>
                  {/*<TouchableOpacity>
                    <Text style = {styles.txtStyle}>Recupere Sua Senha</Text>
                  </TouchableOpacity>*/}
                </View>
          </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
	main: {
		backgroundColor: '#01A83E',
		flex: 1,
  	},
	text:{
		fontSize: wp('5%'),
		fontFamily: 'Roboto', 
		color: 'white',
    alignSelf: 'center',
    marginTop:-wp('5%'),
 	},
	txtStyle:{
		color: 'white',
		fontSize: wp('4,85409%'),
		textAlign: "center",
    marginBottom: 20,
    textDecorationLine: 'underline',
	},  
	Logo:{
		marginTop: 20,
		width: wp('20%'),
		height:hp('20%'),
		resizeMode: 'contain',
    alignSelf: 'center',
	},
	field:{
		color:'white',
		width: '80%',
		alignSelf: 'center',
		marginVertical: 20
	},
	input: {
		paddingHorizontal: 10
	},
	btnLogin:{
		width: '80%',
		backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: hp('10%')
	},
	btnLabel:{
		color:'#006300',
		fontSize: wp('5%'),
	},
	btnImg:{
		width: wp('25%'),
		height: hp('25%'),
		resizeMode: 'contain'
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignSelf: 'center',
  }, 
  company:{
    color: 'white',
    marginStart: wp('15%'),
    alignSelf:'center',
    marginTop: -wp('2%'),
    fontSize: wp('4%')
  }
});
