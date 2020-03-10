import React from 'react';
import {StatusBar} from 'react-native'
import Routes from './src/routes';

export default class App extends React.Component {
	render(){
		return (
			<>
				<StatusBar backgroundColor = "#006300" barStyle="light-content" />
				<Routes />
			</>
		)
	}
}