import Homeheader from '@components/customer/Homeheader';
import BottomTab from '@components/global/BottomTab';
import { Colors } from '@utils/Constants';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Content from '../../components/customer/Content';

const Customerdashboard = () => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#d9e1e4" />
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
