import CustomButton from '@components/UI/CustomButton';
import CustomText from '@components/UI/CustomText';
import { providerLogin } from '@service/authService';
import { Colors } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const ProviderLogin = () => {
  const [loginCredential, setloginCredential] = useState('');
  const [loading, setLoading] = useState(false);
  const [password,setPassword] = useState("")

  const handleAuth = () => {
    setLoading(true);
    try {
      providerLogin(loginCredential,password)
      resetAndNavigate('ProviderHome');
    } catch (error) {
      console.log('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.text} varient="h5">
        Welcome Provider! What's your mobile number?
      </CustomText>
      <CustomText>Enter your email</CustomText>
      <View style={styles.phoneInputContainer}>
        
        <TextInput
          style={styles.phoneInput}
          onChangeText={text => setloginCredential(text)}
          value={loginCredential}
          cursorColor={Colors.primary}
          keyboardType="default"
          placeholder="Enter your email "
          placeholderTextColor="#CCC"
        />

        
      </View>

      <CustomText>Password</CustomText>
      <View style={styles.passwordInputContainer}>

        
        <TextInput
          style={styles.passwordInputContainer}
          onChangeText={text => setPassword(text)}
          value={password}
          cursorColor={Colors.primary}
          keyboardType="default"
          placeholder="Password"
          placeholderTextColor="#CCC"
        />
      </View>
       

      <View style={styles.btn}>
        <CustomButton
          title="Next"
          onPress={() => handleAuth()}
          disabled={false}
          loading={loading}
          style={{ height: 50 }}
        />
      </View>
    </View>
  );
};
export default ProviderLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'flex-end',
    marginBottom: 70,
    margin: 20,
  },
  text: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  passwordInputContainer:{
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
   
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  flag: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingVertical: 12,
  },

  btn: {
    padding: 15,
    marginBottom: 20,
  },
});
