import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const MainTabs = ({ changePage, isClicked }) => {
    return (
        <View style={mainTabs.buttonAlignement}>
            <TouchableOpacity style={mainTabs.touchableOpacity} onPress={() => changePage("Done")}>
                <View>
                    <Text style={{color: isClicked ? 'grey' : '#5E8BFF', fontSize: 35}}>Done</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={mainTabs.touchableOpacity} onPress={() => changePage("To do")}>
                <View>
                    <Text style={{color: isClicked ? '#5E8BFF' : 'grey', fontSize: 35}}>To do</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const mainTabs = StyleSheet.create ({
    touchableOpacity: {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonAlignement: {
        marginTop: 20,
        backgroundColor: '#111C2F',
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
    },
});

export default MainTabs;