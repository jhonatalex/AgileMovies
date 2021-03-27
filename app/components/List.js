import React, { Component } from 'react';
import {View,StyleSheet,Text,TextInput, Image, TouchableOpacity,Alert, FlatList}  from 'react-native';
import axios from 'axios';
import {StackNavigator} from 'react-navigation';





const filmsDetail= require('../views/details/Details')

class List extends Component {

    constructor(props){
    super(props);

    }

    _renderItem(item){

        return(
            
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image style={{width:116, height:130}} source={{uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`}}/>
                <Text style={{color:'#fff',fontSize:12}} >{item.name}</Text>
            </View>
            
        )
    }




    render(){
        const {array}=this.props;
       
        return(
            <View style={{marginTop:5}}>
                <FlatList
                  horizontal
                  ItemSeparatorComponent={()=> <View style={{width:8}} />}  
                  renderItem={({item})=>this._renderItem(item)}
                  data={array}  
                  showsHorizontalScrollIndicator={false}
                />
            </View>

        )
    }

}

export default List