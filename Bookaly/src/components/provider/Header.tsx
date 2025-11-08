import React, { useState } from 'react'
import {Image,  StyleSheet,  Text,TouchableOpacity,View} from 'react-native'

import Icon from '../global/Icon';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';



const Header =()=>{
   const [isVisible, setIsVisible] = useState(false);
   
   function onClick(){
    setIsVisible(true)
   }
    return(
        
        <View style={styles.mainContainer}>
           <SafeAreaView/>
            <View 
                style={[styles.flexRowBetween,styles.container]}>
                <TouchableOpacity>
                        <Icon iconFamily='Ionicons' name='menu' size={22} color='#fff'/>
                </TouchableOpacity>
                <Image 
                source={require('../../assets/images/logo.png')}
                style={styles.logo}/>
                <TouchableOpacity
                    onPress={onClick}>
                    <Image
                    source={require('../../assets/images/user.jpg')}
                    style={styles.profile}/>
                </TouchableOpacity>

               
            </View>    
        </View>

      
        
        
    )
}
export default Header;
const styles = StyleSheet.create({
     mainContainer: {
        backgroundColor: Colors.primary,
    },
    container: {
        padding: 10,
        zIndex: 4,
    },
    curve: {
        position: 'absolute',
        bottom: -screenHeight * 0.09,
        zIndex: 3,
        width: '100%',
    },
    logo: {
        width: screenWidth * 0.4,
        height: screenHeight * 0.048,
        resizeMode: 'contain',
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 140,
        resizeMode: 'cover',
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})