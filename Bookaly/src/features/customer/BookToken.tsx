import { RouteProp, useRoute } from '@react-navigation/native';
import { collectData } from '@state/scanStore';

import React, { FC, use, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@components/global/Icon';
import { goBack, navigate, push, resetAndNavigate } from '@utils/NavigationUtils';
import { Colors } from '@utils/Constants';
import { booktoken } from '@service/BookingProvider';
import { useAuthStore } from '@state/authStore';


const BookToken = () => {
  const { providerId,updateTokenData} = collectData() 
  const {user} = useAuthStore()
  

  const handleToken=async()=>{
    try {
       const res = await booktoken(providerId);
       updateTokenData(res.token);
       resetAndNavigate('Customerdashboard');
    } catch (error) {
      console.log('Booking error', error);
    }
  }

  
  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              name="arrow-back-outline"
              size={24}
              color="white"
              iconFamily="Ionicons"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Share your details with</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.profileSection}>
            <Image
              source={require('@assets/images/user.jpg')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Dr kunal Clinic </Text>
              <Text style={styles.label2}>{providerId}</Text>
              <View style={styles.kycContainer}>
                <Text style={styles.kycText}>✓ verified</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.row}>
              <View style={styles.halfCol}>
                <Text style={styles.label}>Mobile Number</Text>
                <Text style={styles.value}>7371015156</Text>
              </View>
              <View style={styles.halfCol}>
                <Text style={styles.label}>Email ID</Text>
                <Text style={styles.value}>-</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.addressValue}>
                C/O Arun Kumar Singh village kukur bhuka post nawanagar Kukur
                Bhuka Nawanagar
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeader}>User's details</Text>
        <View style={styles.receiverCard}>
          <View style={styles.receiverRow}>
            <Text style={styles.receiverLabel}>
              User - <Text style={styles.receiverValue}>{user?.phone}</Text>
            </Text>
          </View>
        </View>

       
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleToken} activeOpacity={0.2}>
            <Text style={styles.primaryButtonText}>Get Token</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#3ebcdc',
    padding:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerSubtitle: {
    color: '#bfdbfe',
    fontSize: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'light',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  kycContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  kycText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
  },
  halfCol: {
    flex: 1,
    paddingRight: 8,
  },
  thirdCol: {
    flex: 1,
    paddingRight: 4,
  },
  label: {
    fontSize: 12,

    color: '#6b7280',
    marginBottom: 2,
  },
  label2: {
    fontSize: 12,
    marginVertical: 10,
    marginLeft: 5,
    color: '#6b7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  valueHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  addressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 20,
  },
  detailsSection: {
    padding: 16,
    gap: 16, // Works in newer RN versions, otherwise use marginBottom on children
  },
  fieldGroup: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  receiverCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
  },
  receiverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  facilityRow: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  receiverLabel: {
    fontSize: 12,
    color: '#4b5563',
  },
  receiverValue: {
    fontWeight: 'bold',
    color: '#111827',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
