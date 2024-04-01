import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrCode = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getUserId = async() => {
            const userId = await AsyncStorage.getItem('profileId');
            setData(userId);
        }

        getUserId();
    })
    return (
        <View style={styles.container}>
            <View style={styles.qrCodeContainer}>
                {data && <ActivityIndicator />}
                {data && <QRCode value={data} size={200} />}
            </View>
            <Text style={styles.qrText}>{data}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCodeContainer: {
        marginBottom: 20,
    },
    qrText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default QrCode;
