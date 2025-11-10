import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { useState } from 'react'
import {Image, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import  Icon from '../global/Icon'
import QRScannerModel from '@components/models/QRScannerModel';


const Homeheader =()=>{

    const [isVisible,setIsVisible] = useState(false);
    function click(){
        setIsVisible(true)
    }
    return(
        <View style={styles.mainContainer}>
            <View>
            <SafeAreaView/>
            <View style={[styles.flexRowBetween,styles.container]}>
            <Image style={styles.logo} source={require('@assets/images/logo.png')} />
            <TouchableOpacity onPress={click} style={styles.scan}>
                <Icon name='qrcode-scan' size={24} color={Colors.primary} iconFamily='MaterialCommunityIcons'/>
            </TouchableOpacity>
            </View>
            
            {isVisible && (
                <QRScannerModel 
                visible={isVisible}
                onClose={()=> setIsVisible(false)}/>
            )}
            
            
            </View>
        </View>
    )
}
export default Homeheader;
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Colors.primary_light,
    },
    flexRowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex:4
    },
    container: {
        padding: 5,
        zIndex: 4,
    },
    scan:{
        backgroundColor:'#fff',
        marginEnd:10,
        padding:15,
        borderRadius:'100%'
        
    },
    logo: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.07,
        resizeMode: 'contain',
        
    },
})