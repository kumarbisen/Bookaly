import React, { useState } from 'react'
import {Alert, Image,  StyleSheet,  Text,TouchableOpacity,View} from 'react-native'

import Icon from '../global/Icon';

import {  SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import QRGereratorModel from '@components/models/QRGereratorModel';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/UI/CustomText';



const Header =()=>{
   const [isVisible, setIsVisible] = useState(false);
   
const onClick = ()=>{
        setIsVisible(true)
      
   }
    return(
        
        <View style={styles.mainContainer}>
           <SafeAreaView/>
            <View 
                style={[styles.flexRowBetween,styles.container]}>
                <TouchableOpacity style={styles.dropdown}>
                        <CustomText style={styles.dropdowntext}>My Store</CustomText>
                        <Icon iconFamily='Ionicons'  name="caret-down-outline" size={22} color='#fff'/>
                </TouchableOpacity>

                
                <Image 
                source={require('../../assets/images/whitelogo.png')}
                style={styles.logo}/>
                <TouchableOpacity
                    onPress={onClick}>
                    <Image
                    source={require('../../assets/images/user.jpg')}
                    style={styles.profile}/>
                </TouchableOpacity>

                {isVisible && (
                    <QRGereratorModel
                    visible={isVisible}
                    onClose={()=> setIsVisible(false)}/>
                )}

                
               
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
    dropdown:{
        flexDirection:'row',
       
    },
    dropdowntext:{
        color:'white',
        fontSize:14,
         marginHorizontal:5
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