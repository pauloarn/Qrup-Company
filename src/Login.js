import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements'
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';

export default class Login extends React.Component {  
  constructor(props) {
    super(props);    
    this.state = {
        login:'',
        password:'',
        errorMessage: null,
        load: false
    };
  }
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@User')
    if (user){
      this.props.navigation.navigate('User')
    }
  }    
  Loga = async() => {
  if (this.state.login.length === 0 || this.state.password.length === 0 ){
      alert('Campo Vazio')
    } else{ 
      this.setState({load:true})
        try{
          const response = await api.post('/companysessions',{
            cpf: this.state.login,
            password: this.state.password
          }) ;
            await AsyncStorage.setItem('@QrupCompany:token',response.data.token )
            await AsyncStorage.setItem('@QrupCompany:name',response.data.employee.name)
            await AsyncStorage.setItem('@QrupCompany:id',response.data.employee.id)            
            this.setState({load:false})
            this.props.navigation.navigate('Points')
        } catch (response){
          //this.setState({errorMessage: response.data.error });      
          console.log(response);  
          this.setState({load:false})
          alert("Credenciais não conferem")
        }                     
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
                    label = 'Login'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    lineWidth = {2}
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
                    secureTextEntry = {true}
                    keyboardType = 'twitter'
                    lineWidth = {2}                    
                    fontSize = {17}
                    onSubmitEditing = {() => {this.Loga()}}
                    onChangeText = {password =>{(this.setState({password}))}}/>
              </View>
                <Button
                    type = 'outline'
                    title = 'Login'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Loga()}
                /> 
                {/*<View style={styles.footer}>
                  <TouchableOpacity 
                      onPress = {()=>this.Cadastra()}>
                    <Text style={styles.txtStyle}>Cadastre-se</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style = {styles.txtStyle}>Recupere Sua Senha</Text>
                  </TouchableOpacity>
                  </View>*/}
          </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
	main: {
		backgroundColor: '#006300',
		flex: 1,
  	},
	text:{
		fontSize: 25,
		fontFamily: 'Roboto', 
		color: 'white',
		alignSelf: 'center'
 	},
	txtStyle:{
		color: 'white',
		fontSize: wp('4,85409%'),
		textAlign: "center",
		marginBottom: 20
	},  
	Logo:{
		marginTop: wp('10%'),
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
    //marginStart: wp('20%'),
    alignSelf:'center',
    marginTop: -wp('2%'),
    fontSize: wp('4%')
  }
});
