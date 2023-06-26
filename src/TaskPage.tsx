import DoneButton from "./DoneButton";
import React from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const TaskPage = ({showTask, toggleTaskPopup, activeCard, setActiveCard, cards, removeElement, changeStatus}) => {
    return (
        <View>
            <Modal visible={showTask} animationType="slide">
                <View style={[taskPage.task]}>
                    <TouchableOpacity style={[taskPage.quitButton]} onPress={() => toggleTaskPopup(-1)}>
                        <Image source={require('./assets/chevron-down-regular.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[taskPage.deleteButton]} onPress={() => {
                        toggleTaskPopup(-1)
                        removeElement(activeCard)
                        setActiveCard(-1)
                    }}>
                        <Image source={require('./assets/trash-solid-24.png')}/>
                    </TouchableOpacity>
                    <View style={[taskPage.cardTitle]}>
                        <Text style={{
                            color: 'black',
                            fontSize: 30,
                            paddingRight: 50
                        }}>{activeCard !== -1 ? cards[activeCard].text : "null"}</Text>
                    </View>
                    <View style={[taskPage.scrollDescPart]}>
                        <ScrollView style={{padding: 10}}>
                            <Text style={{
                                color: 'black',
                                fontSize: 20,
                                paddingVertical: 15
                            }}>{activeCard !== -1 ? cards[activeCard].desc : "null"}</Text>
                        </ScrollView>
                    </View>
                    <DoneButton onPress={() => {
                        changeStatus(activeCard);
                        toggleTaskPopup(-1);
                        setActiveCard(-1);
                    }} activeCard={activeCard} cards={cards}/>
                </View>
            </Modal>
        </View>
    );
}

const taskPage = StyleSheet.create({
    task: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        backgroundColor: '#9DECFF',
    },
    quitButton: {
        position: 'absolute',
        padding: 6,
        borderRadius: 1000,
        top: 20,
        left: 20,
        backgroundColor: '#111C2F',
    },
    deleteButton: {
        position: 'absolute',
        borderRadius: 1000,
        padding: 14,
        top: 20,
        right: 20,
        backgroundColor: '#111C2F',
    },
    cardTitle: {
        marginTop: 100,
    },
    scrollDescPart: {
        marginTop: 50,
        marginBottom: 150,
        width: '80%',
        height: '45%',
    },
});

export default TaskPage;