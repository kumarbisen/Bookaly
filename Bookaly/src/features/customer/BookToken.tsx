import React from 'react';
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

export default function BookToken() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIconText}>H</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Share your details with</Text>
          <Text style={styles.headerTitle}>District Hospital Buxar</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Main Card */}
        <View style={styles.card}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} 
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Vivek Kumar</Text>
              <View style={styles.kycContainer}>
                 <Text style={styles.kycText}>✓ KYC verified</Text>
              </View>

              <View style={styles.row}>
                <View style={styles.halfCol}>
                  <Text style={styles.label}>Year of Birth</Text>
                  <Text style={styles.value}>27-August-2005</Text>
                </View>
                <View style={styles.halfCol}>
                  <Text style={styles.label}>Gender</Text>
                  <Text style={styles.value}>Male</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Details List */}
          <View style={styles.detailsSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>ABHA Number</Text>
              <Text style={styles.valueHighlight}>91-6320-4713-5041</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>ABHA Address</Text>
              <Text style={styles.valueHighlight}>73710151560@abdm</Text>
            </View>

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
                C/O Arun Kumar Singh village kukur bhuka post nawanagar Kukur Bhuka Nawanagar
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.thirdCol}>
                <Text style={styles.label}>State</Text>
                <Text style={styles.value}>BIHAR</Text>
              </View>
              <View style={styles.thirdCol}>
                <Text style={styles.label}>District</Text>
                <Text style={styles.value}>BUXAR</Text>
              </View>
              <View style={styles.thirdCol}>
                <Text style={styles.label}>Pin Code</Text>
                <Text style={styles.value}>-</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Receiver Details */}
        <Text style={styles.sectionHeader}>Receiver's details</Text>
        <View style={styles.receiverCard}>
          <View style={styles.receiverRow}>
            <Text style={styles.receiverLabel}>Counter-id - <Text style={styles.receiverValue}>1</Text></Text>
            <Text style={styles.receiverLabel}>HP-id/HFR - <Text style={styles.receiverValue}>IN1010000213</Text></Text>
          </View>
          
          <View style={styles.receiverRow}>
             <Text style={styles.receiverLabel}>HIP ID - <Text style={styles.receiverValue}>IN1010000213</Text></Text>
          </View>
          
          <View style={styles.facilityRow}>
             <Text style={styles.receiverLabel}>Facility Name - </Text>
             <Text style={styles.receiverValue}>District Hospital Buxar</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Get Token</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
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
    fontSize: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#d95f26',
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