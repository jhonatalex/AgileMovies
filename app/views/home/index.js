
import React, { Component, useState } from 'react';
import {View,StyleSheet,Text,TextInput, TouchableOpacity,  FlatList, Image}  from 'react-native';
import axios from 'axios';


//componentes
import Loading from '../../components/loading';

//styles
import {styles } from './styles';
import userImage from '../../assets/icon/user.png';


class Home extends Component{
 
    constructor(props){
        super(props);


        this.state={
            loading:false,  
            films:[],
            flix:[],
            users:{},
            token:null,
            tokenRefresh:null,

            sliceOne:[],
            sliceTwo:[],
            counter:0,
            refresh:false,
            loading:false
      

        };
   



    }
    

    componentDidMount() {

    const users = this.props.route.params.token.data.user
    this.setState({users});

    const token = this.props.route.params.token.data.payload.token
    this.setState({token});

    const tokenRefresh = this.props.route.params.token.data.payload.refresh_token
    this.setState({tokenRefresh});

     this.getListPremieres(token,tokenRefresh);
     this.getListPopular(token,tokenRefresh);
    


    }


    getListPremieres = async (token,tokenRefresh) =>{
        const url=`http://161.35.140.236:9005/api/movies/now_playing`
        const _header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        };

            axios.get(url,{
            headers: _header,
            })
            .then(res => {
                this.setState({loading:true})
                const imageBaseUrl = res.data.imageBaseUrl
                const films =res.data.data
                this.setState({films})    
              
               
            
            })
            .catch(err=>Alert.alert('Mensaje','Sesion Expirada  \n Desae  extender la Sesion',
            [
                {text:'Si', onPress:()=>{
                    this.refreshToken(token,tokenRefresh)
                }},
                {text:'No', onPress:()=>{
                    this.props.navigation.navigate('Login')
                }}
            
            
            ]));
                              
    };

   
 
    refreshToken =(token,tokenRefresh) =>{
        token=tokenRefresh;
        this.getListPremieres(token,tokenRefresh);
        this.getListPopular(token,tokenRefresh);
    }

    getListPopular = async(token,tokenRefresh) =>{
        const url=`http://161.35.140.236:9005/api/movies/popular`
        const _header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        };

            axios.get(url,{
            headers: _header,
            })
            .then(res => {
                this.setState({loading:true})
                const imageBaseUrl = res.data.imageBaseUrl
                const flix =res.data.data
                this.setState({flix})    
                this.setState({loading:false})
                //PAGINACION
                const {counter:ct}=this.state;
                const end= ct +10; 
                const sliceOne= flix.slice(ct,end);  
                this.setState({sliceOne});
                this.setState({counter:end})


                //PAGINACION
                const {counter:ctd}=this.state;
                const end2= ctd +10; 
                const sliceTwo= flix.slice(ctd,end2);  
                this.setState({sliceTwo});
                this.setState({counter:end})
                

                
            })
            .catch(err=>Alert.alert('Mensaje','Sesion Expirada  \n Desae  extender la Sesion',
            [
                {text:'Si', onPress:()=>{
                    this.refreshToken(token,tokenRefresh)
                }},
                {text:'No', onPress:()=>{
                    this.props.navigation.navigate('Login')
                }}
            
            ]));
                              
    };    


    
    handleInfiniteOne =()=>{
        const {sliceOne}=this.state;
        this.setState({sliceOne: sliceOne.concat(sliceOne)});
    
    }             
     
    handleInfiniteTwo =()=>{
        const {sliceTwo}=this.state;
        this.setState({sliceTwo: sliceTwo.concat(sliceTwo)});
    
    } 

    handleInfinitePremiers=()=>{
        const {films}=this.state;
        const listaInfinita=[];
        
       
        films.forEach(function callback(value, index) {
            value.id=index;
            listaInfinita.push(value);;
          });

        //this.setState({ films:  films});
        this.setState({ films:  films.concat(films)});
    } 
   

render(){
   
    
    const {
        users,
        imageBaseUrl,
        films,
        flix,
        token,
        tokenRefresh,
        sliceOne,
        sliceTwo,
        loading
    } = this.state;
 
  return (
        <View style={styles.container}>

          <View style={styles.headers}>
            <Text style={styles.title}> Hola  {users.firstName} {users.lastName} </Text>
            <Image  style={styles.imgheader} source={userImage}></Image>
          </View>
             
          <Text style={styles.titleNew}>PELICULAS EN ESTRENO </Text>
        <Loading loading={false}>
        <FlatList
            data={films}
            renderItem={({item,index})=>(
                <View style={styles.containerLista}>  
                    <TouchableOpacity 
                        onPress={()=>{
                            this.props.navigation.navigate('Details',{item,token,tokenRefresh})
                        }}>
                            <Image
                            style={{ width: 200, height: 200, resizeMode:'cover' }}
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
                            />
                    </TouchableOpacity> 
                </View>  
                 )}    
            ItemSeparatorComponent={() =>(
                <View style={{width:2}}/>

            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onEndReached={this.handleInfinitePremiers}
     
        />
        </Loading>
        < Text style={styles.titlePopular}>PELICULAS MAS POPULARES</Text>
    
        <FlatList
            horizontal
            ItemSeparatorComponent={()=> <View style={{width:8}} />}  
            renderItem={({item})=>this._renderItem(item,token,tokenRefresh)}
            data={sliceOne}  
            showsHorizontalScrollIndicator={false}
            onEndReached={this.handleInfiniteOne}
            Onrefresh={this.handleInfiniteOne}
        />
      
        
      <FlatList
            horizontal
            ItemSeparatorComponent={()=> <View style={{width:8}} />}  
            renderItem={({item})=>this._renderItem(item,token,tokenRefresh)}
            data={sliceTwo}  
            showsHorizontalScrollIndicator={false}
            onEndReached={this.handleInfiniteTwo}
        />

        </View>
      
  )};

    



     _renderItem(item,token,tokenRefresh){

        return(
    
            <View style={styles.containerLista}>
                <TouchableOpacity 
                        onPress={()=>{
                            this.props.navigation.navigate('Details',{item,token,tokenRefresh})
                        }}>

                    <Image style={{width:125, height:140}} source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}/>
                    <Text style={styles.txtLista} >{item.title.substr(0,23)}</Text>

                </TouchableOpacity>

            </View>
            
        )
    }





}





export default Home;