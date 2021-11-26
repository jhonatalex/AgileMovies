
import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {View,Style,Button,Alert,}  from 'react-native';
//SCREEN
import Routes from './stackRoutes'


const Stack = createStackNavigator();

function AppStack() {
  return ( 
      <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={Routes.Login}
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={Routes.Home} 
                    options={{
                        headerShown:false,
                        headerTitleAlign:'center',
                        headerStyle:{
                        backgroundColor:'#CCD1D1'    
                        }
                    }}

                />
                <Stack.Screen 
                    name="Details" 
                    component={Routes.Details} 
                    options={{
                        headerShown:false,
                        headerTitleAlign:'center',
                        headerStyle:{
                        backgroundColor:'#CCD1D1'    
                        }
                    }}

                />
                <Stack.Screen 
                    name="List" 
                    component={Routes.List} 
                    options={{
                        headerShown:true,
                        headerTitleAlign:'center',
                        headerStyle:{
                        backgroundColor:'#CCD1D1'    
                        }
                    }}

                />      

            </Stack.Navigator>
      </NavigationContainer>

     
    );
}

export default AppStack;