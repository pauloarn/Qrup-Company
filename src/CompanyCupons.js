import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
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
  render() {
    return (
        <>
            <View style={{width:wp('100%'), height:hp('90%'), backgroundColor:'#f5f5f5'}}>
                <View style ={{height:wp('2%')}}/>
                <FlatList
                data={DATA}
                //data = {this.state.pointHistory}
                renderItem={({ item }) =>   <View style = {styles.main}> 
                                                <View style = {styles.terte}>
                                                    <View style = {styles.stats}>
                                                        <Text style = {{marginTop: -wp('1%'), fontSize: wp('3.5%')}}>{item.cuponName}</Text>
                                                        <Text style = {{marginTop: -wp('1%'), fontSize: wp('2.5%')}}>{item.code}</Text>
                                                    </View>
                                                    <View style = {{flexDirection: 'row', marginHorizontal:wp('2%'), alignItems:'center', justifyContent:'center'}}>
                                                        <Text style = {{fontSize: wp('3.5%'), marginRight: wp('4%')}}>{item.cost} pontos</Text>
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
