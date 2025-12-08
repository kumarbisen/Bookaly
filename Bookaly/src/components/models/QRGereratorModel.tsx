import Icon from '@components/global/Icon';
import { Colors, multiColor } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC, useEffect, useState } from 'react'
import {Modal, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Animated,{
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming

} from 'react-native-reanimated'

interface QRGereratorModelProps{
    visible:boolean;
    onClose:()=> void;
}

const QRGereratorModel:FC<QRGereratorModelProps> =({visible,onClose})=>{

    const [loading,setLoading]= useState(false)
    const [qrValue,setQRValue] = useState('clinic123')
    const shimmerTranslateX = useSharedValue(-300)


    const shimmerStyle = useAnimatedStyle(()=>({
        transform:[{translateX:shimmerTranslateX.value}]
    }))

    useEffect(()=>{
        shimmerTranslateX.value = withRepeat(
            withTiming(300,{duration:1500, easing:Easing.linear}),
            -1,
            false,
        )
        if(visible) {
            setLoading(false);
            
        }

    },[visible])
    return(
        <Modal
        animationType='slide'
        presentationStyle='formSheet'
        visible={visible}
        onRequestClose={onClose}
        onDismiss={onClose}>

            <View style={styles.modelContainer}>
                <View style={styles.qrContainer}>
                {
                    loading || qrValue == null || qrValue==""?(
                        <View style={styles.skeleton}>
                                    <Animated.View style={[styles.shimmerOverlay,shimmerStyle]}>
                                        <LinearGradient 
                                                style={styles.shimmerGradient}
                                                start ={{x: 0, y:0}}
                                                end ={{x:1, y:0}}
                                                colors={['#f3f3f3','#fff','#f3f3f3']}/>
                                        </Animated.View>
                                </View>
                    ):(
                        <QRCode
                            value={qrValue}
                            size={250}
                            linearGradient={multiColor}
                            enableLinearGradient
                            />
                    )
                }
                 </View>

                 <TouchableOpacity
                    onPress= {()=> onClose()}
                    style={styles.closeButton}>
                   <Icon name='close' iconFamily='Ionicons' size={24} color='#000'/>
                </TouchableOpacity>
            </View>
        
        </Modal>
    )
}
export default QRGereratorModel;
const styles = StyleSheet.create({
    modelContainer:{
        flex:1,
        backgroundColor:Colors.primary_light
    },
    qrContainer:{
        marginHorizontal: 20,
        marginTop: screenHeight* 0.12,
        padding: 20,
        borderColor: "#ccc",
        alignSelf: 'center',
        justifyContent: "center",
        backgroundColor:'#fff',
        alignItems: 'center',
        overflow: 'hidden'
    },
    skeleton: {
        width: 250,
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    shimmerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    shimmerGradient: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        padding: 4,
        borderRadius: 100,
        zIndex: 4,
        position: 'absolute',
        top: 10,
        right: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: "#888",
        backgroundColor: "#fff",
    }
})