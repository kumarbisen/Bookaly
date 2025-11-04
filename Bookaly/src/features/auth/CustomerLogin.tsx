import CustomButton from '@components/UI/CustomButton';
import { Colors } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const CustomerLogin = () => {
  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>
              Welcome! What's your mobile number?
            </Text>
            <Text style={styles.subtitle}>
              With a valid number, you can access Bookings, Chats, and our other
              services.
            </Text>
          </View>

          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              maxLength={10}
              cursorColor={Colors.primary_light}
              keyboardType="numeric"
              placeholder="7514885749"
              placeholderTextColor="#CCC"
            />
          </View>
          
        </View>

        <View style={styles.btn}>
            <CustomButton
              title="Next"
              onPress={() => navigate('Customerdashboard')}
              disabled={false}
              loading={false}
              style={{height:50}}
            />
          </View>
      </View>
    </>
  );
};
export default CustomerLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 30,
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
    paddingVertical: 12,
  },
  btn:{
    padding:15,
    marginBottom:20
  }
});
