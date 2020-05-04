import React, { Component } from 'react';

import { View, Modal, TouchableOpacity, Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {FloatingAction} from 'react-native-floating-action'
import AsyncStorage from '@react-native-community/async-storage';

export default class SelectEntry extends Component {
	render(){
		return (
			<Modal
				transparent={true}
				visible={this.props.enabled}
			>
				<View style={{flex: 5, justifyContent: 'center', alignSelf:'flex-end' , backgroundColor: 'rgba(0,0,0,0.7)'}}>
					<View style = {{backgroundColor:'white', alignItems:'center',height:wp('20%'), width:wp('100%'), marginTop:hp('87%'), flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity style = {{alignItems:'center'}} onPress={this.props.onPressCamera}>
                            <Icon size={wp('7%')} name='camera'  color='#01A83E'/>
                            <Text>Escanear Código</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{alignItems:'center'}} onPress={this.props.onPressPen}>
                            <Icon size={wp('7%')} name='pen'  color='#01A83E'/>
                            <Text>Escrever Código</Text>
                        </TouchableOpacity>
                    </View>
				</View>
			</Modal>
		)
	}
}