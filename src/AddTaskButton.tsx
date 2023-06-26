import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

const AddTaskButton = ({toggleAddTaskPopup}) => {
    return (
        <TouchableOpacity style={[addTaskButton.addCardButton]} onPress={toggleAddTaskPopup}>
            <View>
                <Image style={[addTaskButton.listIcon]} source={require('./assets/add-task.png')}/>
            </View>
        </TouchableOpacity>
    );
}

const addTaskButton = StyleSheet.create({
    addCardButton: {
        padding: 17,
        backgroundColor: '#5E8BFF',
        borderRadius: 1000,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 30,
        right: 30,
    },
    listIcon: {
        width: 30,
        height: 30,
    },
});

export default AddTaskButton;
