import React, { Component } from 'react';
import {
	ActivityIndicator,
	View,
	Modal
} from 'react-native';

export default class WriteCode extends Component {
	render(){
		return (
			<Modal
				transparent={true}
				visible={this.props.enabled}
			>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}>
					<ActivityIndicator size= 'large' color = '#006300'/>
				</View>
			</Modal>
		)
	}
}