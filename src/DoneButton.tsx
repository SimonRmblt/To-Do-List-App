import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

const DoneButton = ({onPress, activeCard, cards}) => {
    if (activeCard === -1 || cards[activeCard].status === "Done") return null;

    return (
        <TouchableOpacity
            style={[doneButton.doneButton]}
            onPress={onPress}>
            <View>
                <Image source={require('./assets/check-regular-60.png')}/>
            </View>
        </TouchableOpacity>
    );
};

const doneButton = StyleSheet.create({
    doneButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1000,
        padding: 8,
        bottom: 30,
        backgroundColor: '#111C2F',
    },
});

export default DoneButton;
