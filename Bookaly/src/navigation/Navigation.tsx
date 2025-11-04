import CustomerLogin from '@features/auth/CustomerLogin';

import ProviderLogin from '@features/auth/ProviderLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@utils/NavigationUtils';
import React from 'react'
import LandingScreen from '@features/auth/LandingScreen';
import OTPVerification from '@features/auth/OTPVerification';
import Customerdashboard from '@features/dashboard/Customerdashboard';


const Stack = createNativeStackNavigator();


const Navigation =()=>{
    return(
     
       <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
        initialRouteName='LandingScreen'
        screenOptions={{
            headerShown:false}}>
            <Stack.Screen name='LandingScreen' component={LandingScreen}></Stack.Screen>
            <Stack.Screen name='CustomerLogin' component={CustomerLogin}></Stack.Screen>
            <Stack.Screen name='ProviderLogin' component={ProviderLogin}></Stack.Screen>
            <Stack.Screen name='OTPVerification' component={OTPVerification}></Stack.Screen>
            <Stack.Screen name='Customerdashboard' component={Customerdashboard}></Stack.Screen>


        </Stack.Navigator>
       </NavigationContainer>
     
    )
}
export default Navigation;