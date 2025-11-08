import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { screenHeight, screenWidth } from '@utils/Scaling';
import CustomButton from '@components/UI/CustomButton';
import { navigate } from '@utils/NavigationUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.provider} >
          <Icon
            onPress={()=> navigate('ProviderHome')}
            name="storefront-outline"
            color={Colors.primary}
            size={RFValue(35)}
          />
        </View>
      <View style={{flex:1}}>
        

        <View style={styles.imgcontainer}>
          <Image
            style={styles.img}
            source={require('assets/images/cover.jpg')}
          />
        </View>

        <View style={styles.btncontainer}>
          <CustomButton
            title="Get Started"
            disabled={false}
            loading={false}
            style={{height:60}}
            onPress={() => navigate('CustomerLogin')}
          />
        </View>
      </View>
    </View>
  );
};
export default LandingScreen;
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#d9e1e4',
  },
  provider: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '100%',
    alignSelf: 'flex-end',
    margin: 30,
  },
  btncontainer: {
    flex:1,
    justifyContent:'flex-end',
    elevation:20,
    padding: 35,
    
    
  },
  imgcontainer: {
   alignItems:'center'
   
  },
  img: {
    height: 150,
    width: 400,
    resizeMode: 'contain',
  },
});
