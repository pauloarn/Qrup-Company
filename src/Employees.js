import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import {FloatingAction} from 'react-native-floating-action'
import api from './services/api';
import AsyncStorage from '@react-native-community/async-storage';

const DATA =[
    {
        id:'1',
        employee:'Alessandro',
        role: 'Garçom'
    },
    {
        id:'2',
        employee:'Caio',
        role: 'Gerente'
    },
  ]; 
const role =['Dono', 'Gerente', 'Funcionário']

export default class Emplyees extends Component {
  constructor(props) {
    super(props);    
    this.state = {
        employeeList:'',
        load:false,
        refreshing:false     
    };
}
  async componentDidMount(){
    try{
      const response = await api.get('/companies/'+await AsyncStorage.getItem('@QrupCompany:companyid')+'/employees',{
        headers:{
          Authorization : "Bearer " + await AsyncStorage.getItem('@QrupCompany:token')
      }
      })
      this.setState({
        employeeList: (response.data)
      })
      console.log(response.data)
      console.log(response.data[0].employee[0])
    }catch(response){
      console.log(response)
    }
  }
  render() {
    return (
        <>
          <View style={{width:wp('100%'), height:hp('90%'), backgroundColor:'#f5f5f5'}}>
              <View style= {{marginTop: wp('5%'), flexDirection:'row', justifyContent:'space-between', marginHorizontal: wp('15%')}}>
                  <Text style = {{color:'#707070', fontSize:wp('3.5%')}}> Nome</Text>
                  <Text style = {{color:'#707070', fontSize:wp('3.5%')}}> Função</Text>
              </View>
              <View style={{height:wp('2%')}}/>
              <FlatList
                //data={DATA}
                data = {this.state.employeeList}
                renderItem={({ item }) =>   <TouchableOpacity style = {styles.main} onPress={()=>{this.props.navigation.navigate('EditEmployees',{
                                                                                                                                                  employeeName: item.employee[0].name,
                                                                                                                                                  employeeRole: item.employee[0].role,
                                                                                                                                                })}}>  
                                                <View style = {styles.terte}>
                                                    <View style = {styles.stats}>
                                                        <Text style = {{marginTop: -wp('1%'), fontSize: wp('3.5%')}}>{item.employee[0].name}</Text>
                                                    </View>
                                                    <View style = {{flexDirection: 'row', marginHorizontal:wp('2%'), width:wp('23%'),alignItems:'center', justifyContent:'center'}}>
                                                      <Text style = {{fontSize: wp('3.5%'), marginRight: wp('4%')}}>{role[item.employee[0].role - 1]}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity> }
                keyExtractor={item => JSON.stringify(item.id)}           
              />
            <TouchableOpacity style={styles.float} onPress={()=>{this.props.navigation.navigate('AddEmployees')}}>
              <Icon name='user-plus' size = {wp('6%')} color='white'/>
            </TouchableOpacity>
          </View>
        </>
    );
  }
}
const styles = StyleSheet.create({
    float:{
        backgroundColor:'#01A83E', 
        alignSelf:'flex-end', 
        height:wp('13%'), 
        width:wp('13%'), 
        borderRadius:wp('6.5'), 
        alignItems:'center',
        justifyContent:'center',
        marginRight:wp('6%'),
        marginBottom:wp('6%'),
        elevation:5
    },
    terte:{
        flexDirection: 'row',
        alignItems: 'center',
    },  
    main:{
        marginTop: wp('2%'),
        backgroundColor: '#fff',
        height: hp('7%'),
        width: wp('85%'),
        borderRadius: wp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: wp('1%'),
        marginBottom: wp('2%')
    },
    stats:{
        marginLeft: wp('4%'),
        flexGrow: 1,
        width:0,
        justifyContent:'center'
    },
})