import React, {Children, useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal, TextInput, Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [cardsState, setCards] = useState("To do");
  const [cards, setListData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [activeCard, setActiveCard] = useState(-1);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

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
  const DrawTask = ({task, nbr}) => {
    const {status, text, desc} = task;
    return (
        <View style={[styles.generalCard]}>
          <TouchableOpacity onPress={() => toggleTaskPopup(nbr)}>
            <View style={[styles.cards]}>
              <Text style={{color: 'black', fontSize: 20}}>{text}</Text>
              <Text style={{color: 'black', fontSize: 13}}>{desc.slice(0, 20) + (desc.length > 20 ? "..." : "")}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
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
  const addItem = async () => {
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
      await saveTasks(cards);
    }
  };
  const DoneButton = () => {
    if (activeCard === -1 || cards[activeCard].status === "Done") return null;

    const saveDoneTask = async () => {
      await saveTasks(cards);
    };
    return (
        <TouchableOpacity
            style={[styles.doneButton]}
            onPress={async () => {
              changeStatus(activeCard);
              toggleTaskPopup(-1);
              setActiveCard(-1);
              await saveDoneTask();
            }}>
          <View>
            <Image source={require('./assets/check-regular-60.png')} />
          </View>
        </TouchableOpacity>
    );
  };

  return (
      <SafeAreaView style={[styles.sectionContainer]}>
        <View style={styles.buttonAlignement}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => changePage("Done")}>
            <View>
              <Text style={{color: isClicked ? 'grey' : '#5E8BFF', fontSize: 35}}>Done</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => changePage("To do")}>
            <View>
              <Text style={{color: isClicked ? '#5E8BFF' : 'grey', fontSize: 35}}>To do</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
        {cards.map((card: any, index: number) => {
          if (card.status !== cardsState) return null;
            return (
              <DrawTask key={index} task={card} nbr={index}/>
            )
        })}
        </ScrollView>
        <View>
          <Modal visible={showTask} animationType="slide">
            <View style={[styles.task]}>
              <TouchableOpacity style={[styles.quitButton]} onPress={() => toggleTaskPopup(-1)}>
                  <Image source={require('./assets/chevron-down-regular.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.deleteButton]} onPress={async () => {
                toggleTaskPopup(-1)
                removeElement(activeCard)
                setActiveCard(-1)
                await saveTasks(cards)
              }}>
                <Image source={require('./assets/trash-solid-24.png')}/>
              </TouchableOpacity>
              <View style={[styles.cardTitle]}>
                <Text style={{color: 'black', fontSize: 30, paddingRight: 50}}>{activeCard !== -1 ? cards[activeCard].text : "null"}</Text>
              </View>
              <View style={[styles.scrollDescPart]}>
                <ScrollView style={{padding: 10}}>
                    <Text style={{color: 'black', fontSize: 20, paddingVertical: 15}}>{activeCard !== -1 ? cards[activeCard].desc : "null"}</Text>
                </ScrollView>
              </View>
              <DoneButton/>
            </View>
          </Modal>
        </View>
        <View>
          <Modal visible={showAddTask} animationType="slide">
            <View style={[styles.popup]}>
              <TextInput
                  placeholder="Task name (max 50 char) *"
                  maxLength={50}
                  placeholderTextColor={"grey"}
                  keyboardType="default"
                  style={[styles.input]}
                  onChangeText={handleInputChange}
              />
              <TextInput
                  multiline={true}
                  numberOfLines={4}
                  returnKeyType="next"
                  placeholder="Description"
                  placeholderTextColor={"grey"}
                  keyboardType="default"
                  style={[styles.inputDesc]}
                  onChangeText={handleDescChange}
              />
              <View style={[styles.popupButtons]}>
                <TouchableOpacity style={[styles.button]} onPress={toggleAddTaskPopup}>
                    <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonConfirm]} onPress={addItem}>
                    <Text style={{color: 'white'}}>Add task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity style={[styles.addCardButton]} onPress={toggleAddTaskPopup}>
          <View>
            <Image style={[styles.listIcon]} source={require('./assets/add-task.png')}/>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    backgroundColor: '#111C2F',
    height: '100%',
  },
  touchableOpacity: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonAlignement: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
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
    width: '50%',
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
  taskButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
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
  doneButton: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1000,
    padding: 8,
    bottom: 30,
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

export default App;
