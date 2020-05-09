import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import {Button} from 'react-native-elements'
import SelectEntry from './components/selectEntry'
import SelectEntryCupom from './components/selectEntry'
import InsertCode from './components/InsertCode'
import InsertCupon from './components/InsertCupon'
import moment from 'moment'
import api from './services/api';

export default class Profile extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            name:'',
            role:'',
            funcao:'',
            couponsAvaliable:'',
            coposRead:'',
            couponsRead:'',
            change:false,
            changeCupom:false,
            write: false,
            writeCupom: false,
            date:'',
            id: '',
            auth:''
        };
    }
    async componentDidMount(){
        this.setState({
            name: await AsyncStorage.getItem('@QrupCompany:name'),
            role: await AsyncStorage.getItem('@QrupCompany:role'),
            id: await AsyncStorage.getItem('@QrupCompany:employeeId'),
            date: moment().format('YYYY-MM-DD')
        })
        if (this.state.role == '1'){
            this.setState({funcao: 'Dono da Empresa', auth:true})

        } else if(this.state.role =='2'){
            this.setState({funcao:'Gerente da Empresa', auth:false})
        } else if(this.state.role == '3'){
            this.setState({funcao: 'Funcionário', auth:false})
        }
        try{
            const response = await api.get('/companies/'+await AsyncStorage.getItem('@QrupCompany:companyid')+'/company-coupons')
            this.setState({
                couponsAvaliable: response.data.length
            })
            const resCupon = await api.get('/historic?&ini_date='+this.state.date+'&company_id='+await AsyncStorage.getItem('@QrupCompany:companyid'),{
                headers:{
                    Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
                  }
            })
            this.setState({
                coposRead: resCupon.data.data.filter(coupon => coupon.coupon === null, user_id => user_id.user_id ===  this.state.id).length,
                couponsRead: resCupon.data.data.filter(coupon => coupon.coupon !== null, user_id => user_id.user_id ===  this.state.id).length
            })
        }catch(response){
            console.log(response)
        }
    }
    Exit =async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
    Camera(){
        this.setState({change:false})
        this.props.navigation.navigate('ScanCup')
        this.componentDidMount()
    }
    CameraCupom(){
        this.setState({changeCupom:false})
        this.props.navigation.navigate('ScanCupon')
        this.componentDidMount()
    }
    alterMode = () =>{
        if (this.state.write=== true){
           this.setState({write: false});
         } else if (this.state.write === false){
             this.setState({write: true})
         }
         this.componentDidMount()
    };
    alterModeCupom = () =>{
        if (this.state.writeCupom=== true){
           this.setState({writeCupom: false});
        } else if (this.state.writeCupom === false){
            this.setState({writeCupom: true})
        }
        this.componentDidMount()
    };
    seeEmployee(){
        if (this.state.auth === true){
            this.props.navigation.navigate('Employees')
        } else{
            ToastAndroid.showWithGravityAndOffset(
                'Área disponivel somente para o dono',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        }
    }
    companyData(){
        if (this.state.auth === true){
            this.props.navigation.navigate('EditCompany')
        } else{
            ToastAndroid.showWithGravityAndOffset(
                'Área disponivel somente para o dono',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        }
    }
    companyCupons(){
        if (this.state.auth === true){
            this.props.navigation.navigate('Cupons')
        } else{
            ToastAndroid.showWithGravityAndOffset(
                'Área disponivel somente para o dono',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
              );
        }
        this.componentDidMount()
    }
  render() {
    return (
        <>
            <SelectEntry
                enabled = {this.state.change}
                onPressCamera = {()=>this.Camera()}
                onPressPen = {()=> this.setState({write:true, change:false})}
            />
            <SelectEntryCupom
                enabled = {this.state.changeCupom}
                onPressCamera = {()=>this.CameraCupom()}
                onPressPen = {()=> this.setState({writeCupom:true, changeCupom:false})}
            />
            <InsertCode
                visible = {this.state.write}
                alterMode = {()=>this.alterMode()}
            />
            <View style ={styles.header}>
                <View style = {{marginTop: wp('8%'), marginLeft: wp('8%')}}>
                    <Text style = {{fontSize: wp('6%'), color:'white'}}>Olá, {this.state.name.split(' ',1)}</Text>
                    <Text style = {{fontSize: wp('3.5%'), color:'white'}}>{this.state.funcao}</Text>
                </View>
                <TouchableOpacity style = {{marginRight:wp('8%'), marginTop:wp('3%')}} onPress ={()=> {this.seeEmployee()}}>
                    <Icon size={wp('7%')} name='users'  color='white'/>
                </TouchableOpacity>
            </View>
            <View style = {styles.card}>
                <View style = {{height: wp('20%'), width: wp('20%'), borderRadius:wp('10%'), borderWidth:wp('0.8%'),borderColor:'#01A83E', marginTop: -wp('10%'), backgroundColor:'white',  alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                    <View style = {{height: wp('17%'), width: wp('17%'), borderRadius:wp('8.5%'), borderColor: '#01A83E', borderWidth:wp('0.5%'),  alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                        <Icon name = 'user' size = {wp('10%')} color='#01A83E'/>
                    </View>
                </View>
                <View style = {{flexDirection:'row', justifyContent:'space-between', marginHorizontal: wp('5%'), marginTop:wp('3%')}}>
                    <TouchableOpacity style = {{alignItems:'center'}} onPress = {()=>this.setState({change:true})}>
                        <View style={styles.cardBg}>
                            <Icon2 size={wp('6%')} name='cup'  color='#01A83E'/>
                        </View>
                        <Text style = {styles.sub_Icon}>Escanear Copos</Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity style = {{alignItems:'center'}} onPress={()=>{this.companyData()}}>
                        <View style={styles.cardBg}>
                            <Icon size={wp('6%')} name='id-card'  color='#01A83E'/>      
                        </View>                  
                        <Text style = {styles.sub_Icon}>Empresa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{alignItems:'center'}} onPress = {()=>this.props.navigation.navigate('ScanCupon')}>
                        <View style={styles.cardBg}>  
                            <Icon size={wp('6%')} name='ticket-alt'  color='#01A83E'/>
                        </View>
                        <Text style = {styles.sub_Icon}>Escanear Cupom</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style ={{backgroundColor:'#f5f5f5', width:wp('100%'), height: hp('72.5%')}}>
                <View style = {{flexDirection:'row', marginTop:wp('10%'), justifyContent:'space-between', marginHorizontal:wp('5%')}}>
                    <TouchableOpacity style={styles.subCards} onPress={()=>this.companyCupons()}>
                        <Text style={styles.cardNumber}>{this.state.couponsAvaliable}</Text>
                        <Text style={styles.cardText}>Cupons Disponiveis</Text>                                         
                        <Text style={styles.cardText}></Text>
                        <View style ={{marginTop:-wp("2%"),height: wp('2%'), width:wp('10%'), backgroundColor:'#01A83E', borderRadius:wp('1%')}}/>
                    </TouchableOpacity>
                    <View style={styles.subCards}>
                        <Text style={styles.cardNumber}>{this.state.couponsRead}</Text>
                        <Text style={styles.cardText}>Cupons escaneados</Text>                        
                        <Text style={styles.cardText}>hoje</Text>
                        <View style ={{marginTop:wp("4%"),height: wp('2%'), width:wp('10%'), borderRadius:wp('1%')}}/>
                    </View>
                </View>                
                <View style={styles.bigSubCards}>
                    <Text style={styles.cardNumber}>{this.state.coposRead}</Text>
                    <Text style={styles.cardText}>Copos escaneados hoje</Text>            
                </View>
                <View style ={{height:wp('5%')}}>
                </View>
                <Button
                    type = 'outline'
                    title = 'Sair'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogout}
                    onPress = {()=>this.Exit()}
                /> 
            </View>
        </>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        height: hp('27.5%'),
        width: wp('100%'),
        backgroundColor:'#01A83E',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    card:{
        alignSelf:"center",
        marginTop:-wp('20%'),
        height: hp('21%'),
        width:wp('90%'),
        borderRadius:wp('2%'),
        elevation: wp('5%'),
        backgroundColor: 'white'
    },
    sub_Icon:{
        color:'#01A83E',
        marginTop:wp('1%')
    },
    cardBg:{
        width:wp('14%'), 
        height:wp('14%'), 
        backgroundColor:'#f6f6f6', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:wp('7%')
    },
    subCards:{
        backgroundColor:'white',
        alignItems:'center',
        height: wp('35%'),
        width:wp('42.5%'),
        borderRadius:wp('2%'),
        elevation:wp('2%'),
        justifyContent:'center',
    },
    cardText:{
        color:'#01A83E',
        marginTop:wp('2%'),
        fontSize:wp('4.2%')
    },
    cardNumber:{
        color:'#01A83E',
        fontSize:wp('10%'),
    },
    bigSubCards:{
        backgroundColor:'white',
        alignItems:'center',
        height: wp('35%'),
        width:wp('90%'),
        borderRadius:wp('2%'),
        elevation:wp('2%'),
        justifyContent:'center',
        marginTop:wp('5%'),
        alignSelf:'center'
    },
    btnLogout:{
        // marginTop: wp('75%'),
         width: '40%',
         backgroundColor: 'white',
         borderColor: '#01A83E',
         borderWidth: 2,
         alignSelf: 'center'
     },
     btnLabel:{
         color:'#01A83E',
         fontSize: wp('5%'),
     },

})