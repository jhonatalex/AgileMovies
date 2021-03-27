
import React from 'react';

import  {ActivityIndicator,StyleSheet, View,Dimensions} from 'react-native';


function Loading({loading,children}){
if(loading){

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

}

return children;

}



const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'transparent',
      justifyContent:'center',
      alignItems:'center',
    },
    subcontainer: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
});


export default Loading;