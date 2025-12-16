import CustomerLogin from '@features/auth/CustomerLogin';

import ProviderLogin from '@features/auth/ProviderLogin';
import BookToken from '@features/customer/BookToken'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator ,} from '@react-navigation/native-stack'
import { navigationRef } from '@utils/NavigationUtils';
import React from 'react'

import OTPVerification from '@features/auth/OTPVerification';

import Home from '@features/provider/Home';
import Customerdashboard from '@features/customer/Customerdashboard';
import ProfileScreen from '@features/customer/profileScreen';
import BookedTokenScreen from '@features/customer/BookedTokenScreen';



const Stack = createNativeStackNavigator();


const Navigation =()=>{
    return(
     
       <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
        initialRouteName='CustomerLogin'
        screenOptions={{
            headerShown:false,
            animation: 'slide_from_bottom',}}>
            
            <Stack.Screen name='CustomerLogin' component={CustomerLogin}></Stack.Screen>
            <Stack.Screen name='ProviderLogin' component={ProviderLogin}></Stack.Screen>
            <Stack.Screen name='OTPVerification' component={OTPVerification}></Stack.Screen>
            <Stack.Screen name='Customerdashboard' component={Customerdashboard}></Stack.Screen>
            <Stack.Screen name='ProviderHome' component={Home}></Stack.Screen>
            <Stack.Screen name='BookToken' component={BookToken}></Stack.Screen>
            <Stack.Screen name='profileScreen' component={ProfileScreen} options={{
          animation: 'slide_from_right' // Slides up
        }}></Stack.Screen>
            <Stack.Screen name='BookedTokenScreen' component={BookedTokenScreen}></Stack.Screen>



        </Stack.Navigator>
       </NavigationContainer>
     
    )
}
export default Navigation;