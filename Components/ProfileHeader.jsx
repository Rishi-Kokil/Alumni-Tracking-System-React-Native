import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    iconsContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    optionButton: {
        marginTop: 10,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        backgroundColor : "#262626", // Use proper color format
        borderRadius: 10, // Add border radius
    },
    optionText : {
        color : 'white',
        paddingVertical : 10,
        fontSize : 16,
    }
});

const ProfileHeader = ({ title }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={style.container}>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            <View style={style.iconsContainer}>
                <TouchableOpacity onPress={openModal}>
                    <Ionicons name="qr-code" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Ionicons name="settings" size={26} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Pressable style={style.optionButton} onPress={() => navigation.navigate("Scan")}>
                            <Text
                                style={style.optionText}
                            >Scan</Text>
                        </Pressable>
                        <Pressable style={style.optionButton} onPress={() => navigation.navigate("Qr")}>
                            <Text
                                style={style.optionText}
                            >QR Code</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ProfileHeader;
