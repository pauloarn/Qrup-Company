import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        Image,    
        TouchableOpacity
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import qrup from '../Images/qrup_semroda_semsombra.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  import Icon2 from 'react-native-vector-icons/FontAwesome'
  import Icon3 from 'react-native-vector-icons/MaterialIcons'

export default class Points extends Component {
    Exit = () => {
        this.props.navigation.navigate('Login')
      } 
    Scan = () =>{
        this.props.navigation.navigate('Reader')
    }
    render() {
        return (
            <View>
                <View style = {styles.Cabeça}>    
                    <Image  source = {qrup} style = {styles.Qrup}/>
                    <Text style = {styles.Titulo}>Pontuações</Text>
                    <TouchableOpacity>
                        <Icon name ='ios-exit' color = 'white' style = {styles.Exit} onPress={() => this.Exit()}/>  
                    </TouchableOpacity>
                </View> 
                <View style= {styles.Perfil}>
                    <Icon2 name = 'user-circle-o'color ='#677D35' style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>Leituras Feitas </Text>
                    <Text style= {styles.pontDesgr}> {this.props.navigation.getParam('leitura')} Leitura</Text>
                </View>
                <View style= {styles.adView}>
                    <TouchableOpacity onPress = {()=> this.Scan()}>
                        <Icon3 name='add-circle' color='#677D35' style = {styles.ad}/>
                    </TouchableOpacity>
                </View>                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
Cabeça:{
    flexDirection: 'row',
    height: hp('6%'),
    width: wp('100%'),
    backgroundColor: '#677D35',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
},
Qrup:{
    //marginTop: -wp('2%'),
    height: hp('8%'),
    width: wp('5%'),
    marginStart: wp('2%')
},
Titulo:{
    fontSize: wp('5%'),
},
Exit:{
    fontSize: wp('10%'),
    marginEnd: wp('2%')
},
Perfil:{
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
},
Disgraca:{ 
    marginTop: wp('20%'),
    marginTop: wp('10%'),
    fontSize: wp('35%'),
},
nameDesg:{
    marginTop:wp('10%'),
    fontSize: wp('6%'),
},
pontDesgr:{
    fontFamily:'Roboto',
    marginTop: wp('5%')
},
ad:{
    fontSize: wp('20%'),
},
adView:{
    marginTop: wp('90%'),
    marginEnd: wp('10%'),
    width: wp('20%'),
    height: hp('9%'),
    //backgroundColor: 'red',
    alignContent: 'center',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    textAlignVertical: 'center',
    resizeMode: 'contain'
}
})
