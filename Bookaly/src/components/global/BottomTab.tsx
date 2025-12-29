import React from 'react'
import {Platform, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Icon from './Icon';
import { Colors } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';


const BottomTab =()=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity >
                <Icon 
                color='#3ebcdc'
                size={24}
                name='home-outline'
                iconFamily='Ionicons'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigate('Favorate')}>
                <Icon 
                color='#3ebcdc'
                size={24}
                name='bookmark-outline'
                iconFamily='Ionicons'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigate('profileScreen')}>
                <Icon 
                color='#3ebcdc'
                size={24}
                name='person-outline'
                iconFamily='Ionicons'
                />
            </TouchableOpacity>
        </View>
    )
}
export default BottomTab;
const styles = StyleSheet.create({
     container: {
        width: '100%',
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: Colors.primary_light,
        alignItems: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        elevation: 10,
        
       
        shadowRadius: 5,
        shadowColor: "#888",
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 25 : 15,
     
    },
})