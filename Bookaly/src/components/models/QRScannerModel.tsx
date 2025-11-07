import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  CodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

interface QRScannerModelProps {
  visible: boolean;
  onClose: () => void;
}

const QRScannerModel: FC<QRScannerModelProps> = ({ visible, onClose }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back') as any;
  const [codeFound, setCodeFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    checkPermission();
  }, []);

  const handleScan = (data: any) => {
    // Here we have to connect with https
    console.log('[QRScannerModal] handleScan raw data:', data);
  };

  const codeScanner = useMemo<CodeScanner>(
    () => ({
      codeTypes: ['qr', 'codabar'],
      onCodeScanned: codes => {
        if (codeFound) {
          return console.log('Code Found');
        }
        console.log(`Scanned ${codes?.length} code`);
        if (codes?.length > 0) {
          const scannedData = codes[0].value;
          console.log(scannedData);
          setCodeFound(true);
          handleScan(scannedData);
        }
      },
    }),
    [codeFound],
  );

  return (
    <View>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={visible}
        onRequestClose={onClose}
        onDismiss={onClose}
      >
        <View style={styles.modelContainer}>
          <View style={styles.qrContainer}>
            {!device && !hasPermission ? (
              <View>
                <Image
                  source={require('../../assets/images/no_camera.png')}
                  style={styles.noCameraImage}
                />
              </View>
            ) : (
              <View  >
                <Camera
                  style={styles.camera}
                  isActive={visible}
                  device={device}
                  codeScanner={codeScanner}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default QRScannerModel;
const styles = StyleSheet.create({
  noCameraImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  camera:{
    width: screenWidth * 0.7, 
    height: screenHeight*0.3,
    
  },
  modelContainer: {
    flex: 1,
    backgroundColor: Colors.primary_light,
  },
  qrContainer: {
    marginHorizontal: 20,
    backgroundColor: 'gray',
    marginTop: screenHeight * 0.12,
    padding: 20,
    borderColor: '#ccc',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
