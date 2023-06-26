import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const DrawTask = ({task, nbr, onPress}) => {
    const {status, text, desc} = task;
    return (
        <View style={[tasksCards.generalCard]}>
            <TouchableOpacity onPress={() => onPress(nbr)}>
                <View style={[tasksCards.cards]}>
                    <Text style={{color: 'black', fontSize: 20}}>{text}</Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 13
                    }}>{desc.slice(0, 20) + (desc.length > 20 ? "..." : "")}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const tasksCards = StyleSheet.create({
    generalCard: {
        borderWidth: 1,
        backgroundColor: '#9DECFF',
        borderRadius: 30,
        margin: 10,
        paddingTop: 7,
        paddingLeft: 20,
        paddingBottom: 17,
        paddingRight: 20,
    },
    cards: {
        margin: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
});

export default DrawTask;