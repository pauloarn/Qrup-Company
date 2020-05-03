import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import Icon from 'react-native-vector-icons/FontAwesome5'
  import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
  import {Button} from 'react-native-elements'

export default class Profile extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            name:'',
            role:'',
            funcao:''     
        };
    }
    async componentDidMount(){
        this.setState({
            name: await AsyncStorage.getItem('@QrupCompany:name'),
            role: await AsyncStorage.getItem('@QrupCompany:role'),
        })
        if (this.state.role == '1'){
            this.setState({funcao: 'Dono da Empresa'})
        } else if(this.state.role =='2'){
            this.setState({funcao:'Gerente da Empresa'})
        } else if(this.state.role == '3'){
            this.setState({funcao: 'Funcionário'})
        }
    }
    Exit =async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
  render() {
    return (
        <>
            <View style ={styles.header}>
                <View style = {{marginTop: wp('8%'), marginLeft: wp('8%')}}>
                    <Text style = {{fontSize: wp('6%'), color:'white'}}>Olá, {this.state.name.split(' ',1)}</Text>
                    <Text style = {{fontSize: wp('3.5%'), color:'white'}}>{this.state.funcao}</Text>
                </View>
                <TouchableOpacity style = {{marginRight:wp('8%'), marginTop:wp('3%')}} onPress ={()=> {this.props.navigation.navigate('Employees')}}>
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
                    <TouchableOpacity style = {{alignItems:'center'}} onPress = {()=>this.props.navigation.navigate('ScanCup')}>
                        <View style={styles.cardBg}>
                            <Icon2 size={wp('6%')} name='cup'  color='#01A83E'/>
                        </View>
                        <Text style = {styles.sub_Icon}>Escanear Copos</Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity style = {{alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('EditCompany')}}>
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
                    <TouchableOpacity style={styles.subCards} onPress={()=>this.props.navigation.navigate('Cupons')}>
                        <Text style={styles.cardNumber}>0</Text>
                        <Text style={styles.cardText}>Cupons Disponiveis</Text>                                         
                        <Text style={styles.cardText}></Text>
                        <View style ={{marginTop:wp("4%"),height: wp('2%'), width:wp('10%'), backgroundColor:'#01A83E', borderRadius:wp('1%')}}/>
                    </TouchableOpacity>
                    <View style={styles.subCards}>
                        <Text style={styles.cardNumber}>0</Text>
                        <Text style={styles.cardText}>Cupons escaneados</Text>                        
                        <Text style={styles.cardText}>hoje</Text>
                        <View style ={{marginTop:wp("4%"),height: wp('2%'), width:wp('10%'), borderRadius:wp('1%')}}/>
                    </View>
                </View>                
                <View style={styles.bigSubCards}>
                    <Text style={styles.cardNumber}>0</Text>
                    <Text style={styles.cardText}>Copons escaneados hoje</Text>            
                </View>
                <View style ={{height:wp('5%')}}/>
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
        fontSize:wp('4.2%')
    },
    cardNumber:{
        color:'#01A83E',
        fontSize:wp('10%')
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