import {StyleSheet}  from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#222221',
      paddingVertical:5,
      paddingHorizontal:10,
    
    },
    headers: {
      marginTop:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'flex-end',
    },

    imgheader: {
      width:25,
      height:25
    },
    title: {
      color:'#fff',
      fontSize:18,
      fontWeight:'bold',
      marginVertical:10,
    },
    input: {
      borderWidth: 1,
      borderColor:'#fff',
      height:45,
      width:'100%',
      paddingHorizontal:10,
      color:'#fff',
    },
  
    button: {
      borderWidth: 1,
      borderColor:'#fff',
      height:45,
      width:'100%',   
      backgroundColor:'#fff',
      marginTop: 80,
      justifyContent:'center',
      alignItems:'center',
    
    },
  
   txtButton:{
      color:'#fff',
      fontSize:18,
      fontWeight:'bold',
      color:"#000"
    },

    containerLista: {
      alignItems:'center',
    },

    txtLista:{
      color:'#fff',
      fontSize:12,
      fontWeight:'bold',
      textAlign:'center',
    },
    titleNew:{
      color:'red',
      fontSize:25,
      fontWeight:'bold',
      fontFamily:'monserrat',
      justifyContent:'center',
      alignItems:'center',
    },
    titlePopular:{
      marginTop:'1%',
      color:'yellow',
      fontSize:25,
      fontWeight:'bold',
      fontFamily:'monserrat',
      justifyContent:'center',
      alignItems:'center',
    },
  
  });
  
  