import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import api from './services/api';
import AsyncStorage from '@react-native-community/async-storage';
const DATA =[
    {
        id:'1',
        cuponName:'Cupon',
        cost: '4',
        code: 'all4'
    },
    {
        id:'2',
        cuponName:'Caio',
        cost: '5',
        code: 'minus5'
    },
  ]; 

export default class companyCupons extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            cuponsList:'',
            load:false,
            refreshing:false     
        };
    }
    async componentDidMount(){
        try{
            const response = await api.get('/companies/'+await AsyncStorage.getItem('@QrupCompany:companyid')+'/company-coupons') ;
            this.setState({cuponsList: response.data, refreshing: false})
            console.log(response.data)
            
        } catch (response){
            this.setState({load:false, refreshing:false})
            console.log(response)
            ToastAndroid.showWithGravityAndOffset(
                'Problema para carregar os cupons',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );
        } 
    }
  render() {
    return (
        <>
            <View style={{width:wp('100%'), height:hp('90%'), backgroundColor:'#f5f5f5'}}>
                <View style ={{height:wp('2%')}}/>
                <FlatList
                //data={DATA}
                data = {this.state.cuponsList}
                renderItem={({ item }) =>   <View style = {styles.main}> 
                                                <View style = {styles.terte}>
                                                    <View style = {styles.stats}>
                                                        <Text style = {{marginTop: -wp('1%'), fontSize: wp('3.5%')}}>{item.name}</Text>
                                                        <Text style = {{marginTop: -wp('1%'), fontSize: wp('2.5%')}}>{item.description}</Text>
                                                    </View>
                                                    <View style = {{flexDirection: 'row', marginHorizontal:wp('2%'), alignItems:'center', justifyContent:'center'}}>
                                                        <Text style = {{fontSize: wp('3.5%'), marginRight: wp('4%')}}>{item.points} pontos</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <Icon size={wp('5%')} name= 'trash-alt'  color='red' style ={{marginRight: wp('4%')}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> }
                keyExtractor={item => item.id}           
            />
            <TouchableOpacity style={styles.float} onPress={()=>{this.props.navigation.navigate('AddCupons')}}>
                <Icon name='plus' size = {wp('6%')} color='white'/>
            </TouchableOpacity>
          </View>
        </>
    );
  }
}
const styles = StyleSheet.create({
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
})
