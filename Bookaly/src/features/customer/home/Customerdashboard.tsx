import Homeheader from '@components/customer/Homeheader';
import BottomTab from '@components/global/BottomTab';
import CustomButton from '@components/UI/CustomButton';
import CustomHeader from '@components/UI/CustomHeader';
import CustomInput from '@components/UI/CustomInput';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Content from './Content';

const Customerdashboard = () => {
  return (
    <View style={styles.container}>
    <Homeheader />
    <Content />
    <BottomTab/>
    </View>
  );
};
export default Customerdashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
 
});
