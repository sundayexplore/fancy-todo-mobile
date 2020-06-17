import React, { useState, useEffect } from "react";
import { StyleSheet, Keyboard, AsyncStorage, View } from "react-native";
// import { Modal, Portal, Card, Button, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from "@/styles";
import { todoAPI, addTodo } from "@/actions/todoActions";

export default (props: any) => {
  const { navigation, route, modalVisible, showModal, hideModal } = props;
  const [todoData, setTodoData] = useState({
    name: '',
    dueDate: new Date(Date.now())
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    dueDate: false
  });

  useEffect(() => {
    if (!modalVisible) {
      setTodoData({name: '', dueDate: new Date(Date.now())});
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  }, [modalVisible]);

  const handleTodoChange = (field: string, data: any) => {
    switch (field) {
      case 'name':
        setTodoData({...todoData, name: data});
        break;
    
      case 'dueDate':
        try {
          const date = data.getDate() || todoData.dueDate.getDate();
          const month = data.getMonth() || todoData.dueDate.getMonth();
          const year = data.getFullYear() || todoData.dueDate.getFullYear();
          const setTargetDate = todoData.dueDate;
          setTargetDate.setFullYear(year, month, date);
          setShowDatePicker(false);
          setTodoData({ ...todoData, dueDate: setTargetDate });
        } catch (err) {
          setShowDatePicker(false);
        }
        break;

      case 'dueTime':
        try {
          const hours = data.getHours() || todoData.dueDate.getHours();
          const minutes = data.getMinutes() || todoData.dueDate.getMinutes();
          const seconds = data.getSeconds() || todoData.dueDate.getSeconds();
          const setTargetTime = todoData.dueDate;
          setTargetTime.setHours(hours, minutes, seconds);
          setShowTimePicker(false);
          setTodoData({...todoData, dueDate: setTargetTime});
        } catch (err) {
          setShowTimePicker(false);
        }
        break;
    }
  }

  const showPicker = (pickerType: string) => {
    Keyboard.dismiss();
    switch (pickerType) {
      case 'date':
        setShowDatePicker(true);
        break;
    
      case 'time':
        setShowTimePicker(true);
        break;
    }
  };

  const handleAddTodo = async () => {
    console.log({todoData});
    AsyncStorage.getItem('token')
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    // checkError();
    // if (Object.values(errors).every((currentValue) => currentValue === false)) {
    //   try {
    //     const token = AsyncStorage.getItem('token');
    //     // const {} = todoAPI.post('/todos', todoData);
    //   } catch (err) {
        
    //   }
    // }
  }

  return (
    // <Portal>
    //   <Modal contentContainerStyle={[styles.centerOnly, customStyles.modalContainer]} visible={modalVisible} onDismiss={hideModal}>
    //     <Card style={customStyles.cardContainer}>
    //       <Card.Title title="Add Todo" style={customStyles.cardTitle} />
    //       <Card.Content>
    //         <TextInput 
    //           style={customStyles.textInput} 
    //           mode="flat" 
    //           label="Todo" 
    //           value={todoData.name} 
    //           multiline={true} 
    //           onChangeText={(text) => handleTodoChange('name', text)}
    //           autoFocus={true}
    //         />
    //         <TextInput 
    //           style={customStyles.textInput} 
    //           mode="flat" 
    //           label="Due Date" 
    //           value={todoData.dueDate.toLocaleDateString()} 
    //           multiline={true}
    //           onFocus={() => showPicker('date')}
    //           onKeyPress={() => showPicker('date')}
    //         />
    //         <TextInput 
    //           style={customStyles.textInput} 
    //           mode="flat" 
    //           label="Due Time" 
    //           value={todoData.dueDate.toLocaleTimeString()} 
    //           multiline={true}
    //           onFocus={() => showPicker('time')}
    //           onKeyPress={() => showPicker('time')}
    //         />
    //         {
    //           showDatePicker && 
    //           <DateTimePicker
    //             value={todoData.dueDate}
    //             mode="date"
    //             minimumDate={new Date(Date.now())}
    //             onChange={(event, selectedDate) => handleTodoChange('dueDate', selectedDate)}
    //             onResponderReject={() => console.log("DATE CANCEL!")}
    //           />
    //         }
    //         {
    //           showTimePicker &&
    //           <DateTimePicker
    //             value={todoData.dueDate}
    //             mode="time"
    //             minimumDate={new Date(Date.now())}
    //             onChange={(event, selectedTime) => handleTodoChange('dueTime', selectedTime)}
    //           />
    //         }
    //       </Card.Content>
    //       <Card.Actions style={customStyles.cardActions}>
    //         <Button onPress={hideModal}>Cancel</Button>
    //         <Button onPress={handleAddTodo}>Add</Button>
    //       </Card.Actions>
    //     </Card>
    //   </Modal>
    // </Portal>
    <View></View>
  );
};

const customStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    padding: 20,
    width: wp(90),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  cardTitle: {
    width: wp(30)
  },
  textInput: {
    width: wp(70)
  },
  cardActions: {
    justifyContent: 'flex-end'
  }
});
