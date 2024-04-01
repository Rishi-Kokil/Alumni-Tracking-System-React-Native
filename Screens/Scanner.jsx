import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const QRCodeScannerScreen = () => {
  const [scannedData, setScannedData] = useState(null);

  const onBarCodeRead = ({ data }) => {
    setScannedData(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
      {scannedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Scanned Data: {scannedData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
  },
});

export default QRCodeScannerScreen;
