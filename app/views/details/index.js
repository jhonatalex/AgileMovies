import React, { Component, useState } from 'react';
import {View,StyleSheet,Text,Button,SafeAreaView , ScrollView,TouchableOpacity,  FlatList, Image,Alert,}  from 'react-native';
import axios from 'axios';


//componentes
import Loading from '../../components/loading';
import List from '../../components/List';

//styles
import {styles } from './styles';
import userImage from '../../assets/icon/user.png';


class Details extends Component{
 
    constructor(props){
        super(props);

        this.state={
            filmsSelected:[],
            actors:[],
            token:null,  
            tokenRefresh:null
        };    

    }

    componentDidMount() {

        const filmsSelected = this.props.route.params.item
        this.setState({filmsSelected});
    

        const tokenRefresh= this.props.route.params.tokenRefresh;
        this.setState({tokenRefresh});


        const token= this.props.route.params.token;
        this.setState({token});
        
   

        this.getDAtaApi (token,tokenRefresh,filmsSelected );
        

    }


    getDAtaApi =(token,tokenRefresh,filmsSelected )=>{

        const _header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token

        };

            axios.get(`http://161.35.140.236:9005/api/movies/${filmsSelected.id}/actors`,{
            headers: _header,
            })
            .then(res => {
    
                const imageBaseUrl = res.data.imageBaseUrl
                const actors =res.data.data
                console.log({actors});
                this.setState({actors});
              
            
            })
            .catch(err=>Alert.alert('Mensaje','Sesion Expirada  \n Desae  extender la Sesion',
            [
                {text:'Si', onPress:()=>{
                    this.refreshToken(token,tokenRefresh,filmsSelected)
                }},
                {text:'No', onPress:()=>{
                    this.props.navigation.navigate('Login')
                }}
            
            
            ]));


    };



    
    refreshToken =(token,tokenRefresh,filmsSelected) =>{
        token=tokenRefresh;
       
        this.getDAtaApi (token,tokenRefresh,filmsSelected);

    }



   
render(){

    const {filmsSelected} = this.state;
    const {actors} = this.state;
    const {token} = this.state;

  return (

  
    <View style={styles.container} >
    
                <Button style={{ color:'black'}}
                title="Volver"
                onPress={() => this.props.navigation.navigate('Home',{token})}
                />
            <Text style={styles.titlePopular}>{filmsSelected.title}</Text>
        
                <Image
                resizeMode= "stretch"
                style={{ width: '100%', height:'40%'  }}
                source={{ uri: `https://image.tmdb.org/t/p/w500${filmsSelected.poster_path}`}}
                />
        
            <Text style={styles.title}>{filmsSelected.overview}</Text>
           
            <List array={actors}  />
    
    </View>
   
  )};

}





export default Details;