import ActionButtton from '@components/UI/ActionButton';
import CustomHeader from '@components/UI/CustomHeader';
import CustomText from '@components/UI/CustomText';
import { useAuthStore } from '@state/authStore';
import { storage, tokenStorage } from '@state/storage';
import { Fonts } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';

const ProfileScreen = () => {
  const { logout, user } = useAuthStore();

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      
      <View style={styles.content} >
        <View style={{marginVertical:20}}>
        <CustomText varient="h2" fontFamily={Fonts.SemiBold}>
          Your Account
        </CustomText>
        <CustomText varient="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>
        </View>
        <CustomText varient="h3" fontFamily={Fonts.SemiBold}>
          Your Information
        </CustomText>
        <ActionButtton icon="book-outline" label="Address book" />
        <ActionButtton icon="alert-circle-outline" label="About us" />
        <ActionButtton icon="comment-question" label="Support" />
        <ActionButtton
          icon="logout"
          label="Logout"
          onPress={() => {
            logout();
            tokenStorage.clearAll();
            storage.clearAll();
            resetAndNavigate('CustomerLogin');
          }}
        />
      </View>
      
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  content:{
    marginLeft:20,
   

  }
});
