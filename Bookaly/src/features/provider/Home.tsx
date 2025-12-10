
import Header from '@components/provider/Header';
import React from 'react'
import {StatusBar, Text,View} from 'react-native'


const Home =()=>{
    return(
        <View>
        <StatusBar barStyle="light-content" backgroundColor="#3ebcdc" />
        <Header/>
        </View>
       
    )
}
export default Home;