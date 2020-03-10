import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal} from 'react-native'
import {Button} from 'react-native-elements'
import Icon2 from  'react-native-vector-icons/MaterialIcons'
import {FloatingAction} from 'react-native-floating-action'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'; 
import api from './services/api';

export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Reader')
    }
    Terte =() =>{
        alert("Testando Botão")
    }

    constructor(props) {
        super(props);    
        this.state = {
            token: '',
            name:'',
            id:'',
            read:'',
            insertCode: false,

        };
      }
    async componentDidMount (){
        this.setState({
            token: await AsyncStorage.getItem('@QrupCompany:token'), 
            id: await AsyncStorage.getItem('@QrupCompany:id'),
            name: await AsyncStorage.getItem('@QrupCompany:name')
        })
    }
    onTextInsert = async() =>{
        try{
            const response = await api.post('/users/'+this.state.id+'/reads',{
              qr: this.state.read
            }) ;    
              this.setState({load:false, insertCode: false})
          } catch (response){
            //this.setState({errorMessage: response.data.error });      
            console.log(response);  
            this.setState({load:false})
            alert("Copo Não Vinculado a Usuário")
          }             
        this.alterMode()
    }
    
    alterMode = () =>{
        if (this.state.insertCode=== true){
           this.setState({insertCode: false});
         } else if (this.state.insertCode === false){
             this.setState({insertCode: true})
         }
     };
     Close =()=>{
         this.setState({insertCode : false})
     }
    func ={
        pen :this.alterMode,
        exc: this.Close,
        scan: this.Scan
    }
    actions = [
        {
          text: "Write Code",
          icon:  <Icon2 name="create" style={styles.actionButtonIcon}/>,
          name: "pen",
          position: 2,
          color: '#006300'
        },
        {
          text: "Exclude Item",
          icon: <Icon2 name="clear" style={styles.actionButtonIcon}/>,
          name: "exc",
          position: 1,
          color: '#006300'
        },
        {
          text: "Scan Code",
          icon: <Icon2 name="add-a-photo" style={styles.actionButtonIcon}/>,
          name: "scan",
          position: 3,
          color: '#006300'
        },
      ];
    render() {        
        return (
            <>     
                {/*<Text>{this.props.navigation.getParam('leitura')}</Text>*/}
                <Modal
                    transparent={true}
                    visible={this.state.insertCode}
                >
                    <View style = {styles.insertCode}>                            
                        <TextInput
                            placeholder = {'Insert Your Qrup Code Here'}
                            autoCapitalize = 'characters'
                            placeholderTextColor = '#006300'
                            style = {styles.inputCode}
                            onChangeText = {(read)=>this.setState({read})}
                            onSubmitEditing = {()=>this.onTextInsert()}
                        />
                        <View style = {styles.buttons}>
                            <Button
                                type = "solid"
                                title = "Cancel"                                    
                                buttonStyle = {styles.btn}
                                onPress = {()=>this.alterMode()}
                            />
                            <Button
                                type = "solid"
                                title = "Ok"
                                buttonStyle = {styles.btn}
                                onPress = {()=> this.onTextInsert()}
                            />
                        </View>
                    </View>
                </Modal>
                <FloatingAction
                    actions={this.actions}
                    onPressItem={name => {
                        this.func[name]()
                    }}
                    color= '#006300'
                    dismissKeyboardOnPress = {true}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    terte:{
        backgroundColor: 'red',
        fontSize: 20
    },
    ad:{
        fontSize: wp('15%'),
    },
    /*adView:{
        marginTop: hp('80%'),
        width: wp('20%'),
        height: hp('9%'),
        //backgroundColor: 'red',
        alignContent: 'center',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        textAlignVertical: 'center',
        resizeMode: 'contain'
    },*/
    actionButtonIcon: {
        fontSize: wp('6%'),
        height: 30,
        color: 'white',
    },
    insertCode:{
        backgroundColor: 'rgba(68, 68, 68, 0.6)',
        width: wp('100%'),
        height: hp('100%'),
    },
    inputCode:{
        fontSize: wp('3%'),
        alignSelf: 'center',
        marginTop: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#006300',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('1%'),
        color: '#006300'
    },
    buttons:{
        //backgroundColor: 'rgba(68, 68, 68, 0.6)',
        width: wp('55%'),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    btn:{
        marginTop: wp('4%'),
        backgroundColor: '#006300',
        width: wp('20%'),
		alignSelf: 'center'
    },
})