
import React, { Component, useState } from 'react';
import {View,StyleSheet,Text,TextInput, Image, TouchableOpacity,Alert}  from 'react-native';
import axios from 'axios';

import userImage from '../../assets/icon/agilesoft-logo.png';

//componentes
import Loading from '../../components/loading';

//styles
import {styles } from './styles';

 

class Login extends Component{
 
    constructor(props){
        super(props);


        this.state={
            Usuario:null,
            Password:null,
            loading:false,   
        };
   
    }

    
    componentDidMount() {
   
    }

  

    render(){

    const {Usuario,Password, loading} = this.state;



        return (
            //<Loading loading={loading}>

        <View style={styles.container}>

   

            <View style={styles.subcontainer}>
            <Loading loading={loading}>  
                <Image  style={styles.img}
                        source={userImage}>
                
                </Image>

                </Loading>
            </View>
       


            <View style={styles.form}>

                <Text style={styles.title}>USER:</Text> 
                <TextInput
                        style={styles.input}
                        value={Usuario}
                        onChangeText={val =>this.setState({Usuario: val})}
                    
                    >
                </TextInput>

                <Text style={styles.title}>PASSWORD:</Text> 
                <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        value={Password}
                        onChangeText={val =>this.setState({Password: val})}
                    
                    >
                </TextInput>

              
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{

                        if(Usuario==null){
                            Alert.alert('Mensaje','Introduzca un Usuario',[
                                {text:'Aceptar', }
                            ]);        
                        }else if(Password==null){

                            Alert.alert('Mensaje','Introduzca un Password',[
                                {text:'Aceptar',}
                            ]);   
                        }else{
                    
                            const user = {
                                username: Usuario,
                                password: Password
                               // username: "agilesoft",
                                //password: "agile1234"
                            };
                        
                   
    
                            axios.post(`http://161.35.140.236:9005/api/auth/login`, user )
                                .then(res => {
                                const token = res.data
                                  
                                    this.props.navigation.navigate('Home',{token}) 
                                
                                })
                                .catch(err=>Alert.alert('Mensaje','Usuario y Password Incorrectos Verifiquelos e Intente Nuevamente',[
                                    {text:'Aceptar', onPress:()=>console.log('alert')}
                                ]));
                            


                            
                       }

                        


                    }}
                    >
                    <Text style={styles.txtButton}>INGRESAR</Text> 
                    </TouchableOpacity>
                
            </View>

  

        </View>

        //</Loading>
    )};

}





export default Login;