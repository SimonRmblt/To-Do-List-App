import React from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const AddTaskPage = ({showAddTask, toggleAddTaskPopup, handleInputChange, handleDescChange, addItem}) => {
    return (
        <View>
            <Modal visible={showAddTask} animationType="slide">
                <View style={[addTaskPage.popup]}>
                    <TextInput
                        placeholder="Task name (max 50 char) *"
                        maxLength={50}
                        placeholderTextColor={"grey"}
                        keyboardType="default"
                        style={[addTaskPage.input]}
                        onChangeText={handleInputChange}
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        returnKeyType="next"
                        placeholder="Description"
                        placeholderTextColor={"grey"}
                        keyboardType="default"
                        style={[addTaskPage.inputDesc]}
                        onChangeText={handleDescChange}
                    />
                    <View style={[addTaskPage.popupButtons]}>
                        <TouchableOpacity style={[addTaskPage.button]} onPress={toggleAddTaskPopup}>
                            <Text style={{color: 'white', fontSize: 20}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[addTaskPage.buttonConfirm]} onPress={addItem}>
                            <Text style={{color: 'white', fontSize: 20}}>Add task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const addTaskPage = StyleSheet.create({
    popup: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#111C2F',
    },
    popupButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 30,
    },
    input: {
        height: 40,
        width: '85%',
        margin: 12,
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
    },
    inputDesc: {
        width: '85%',
        margin: 12,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
        height: 100,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonConfirm: {
        backgroundColor: '#5E8BFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 3,
    },
});

export default AddTaskPage;