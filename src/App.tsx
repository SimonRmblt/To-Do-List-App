import React, {useEffect, useState} from 'react';
import {Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./Style";
import MainTabs from "./MainTabs";
import CardsPreview from "./CardsPreview";
import TaskPage from "./TaskPage";
import AddTaskPage from "./AddTaskPage";
import AddTaskButton from "./AddTaskButton";

function App(): JSX.Element {
    const [cardsState, setCards] = useState("To do");
    const [inputValue, setInputValue] = useState('');
    const [descValue, setDescValue] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [activeCard, setActiveCard] = useState(-1);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [cards, setListData] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);
    useEffect(() => {
        saveTasks(cards);
    }, [cards]);
    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('cards');
            if (savedTasks !== null) {
                setListData(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.log('Error loading tasks from AsyncStorage:', error);
        }
    };
    const saveTasks = async (updatedTasks) => {
        try {
            await AsyncStorage.setItem('cards', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        } catch (error) {
            console.log('Error saving tasks to AsyncStorage:', error);
        }
    };

    const removeElement = (index: number) => {
        const updatedList = [...cards];
        updatedList.splice(index, 1);
        setListData(updatedList);
    };
    const changeStatus = (index: number) => {
        const updatedList = [...cards];
        updatedList[index].status === 'Done' ? updatedList[index].status = 'To do' : updatedList[index].status = 'Done';
        setListData(updatedList);
    }
    const changePage = (state: string) => {
        setCards(state);
        if (state !== cardsState)
            setIsClicked(!isClicked);
    };
    const toggleAddTaskPopup = () => {
        setInputValue('');
        setShowAddTask(!showAddTask);

    };
    const toggleTaskPopup = (number: number) => {
        setActiveCard(number);
        setShowTask(!showTask);
    };
    const handleInputChange = (text: string) => {
        setInputValue(text);
    };
    const handleDescChange = (text: string) => {
        setDescValue(text);
    };
    const addItem = () => {
        if (inputValue.trim() !== '') {
            const newItem = {
                status: 'To do',
                text: inputValue,
                desc: descValue
            };
            setListData([...cards, newItem]);
            setInputValue('');
            setDescValue('');
            toggleAddTaskPopup();
            setTask('');
        }
    };

    return (
        <SafeAreaView style={[styles.sectionContainer]}>
            <View style={{marginBottom: 79,}}>
                <CardsPreview cards={cards} cardsState={cardsState} toggleTaskPopup={toggleTaskPopup}/>
            </View>
            <TaskPage cards={cards} activeCard={activeCard} toggleTaskPopup={toggleTaskPopup} removeElement={removeElement} changeStatus={changeStatus} setActiveCard={setActiveCard} showTask={showTask}/>
            <AddTaskPage addItem={addItem} handleInputChange={handleInputChange} handleDescChange={handleDescChange} showAddTask={showAddTask} toggleAddTaskPopup={toggleAddTaskPopup}/>
            <AddTaskButton toggleAddTaskPopup={toggleAddTaskPopup}/>
            <MainTabs changePage={changePage} isClicked={isClicked}/>
        </SafeAreaView>
    );
}

export default App;
