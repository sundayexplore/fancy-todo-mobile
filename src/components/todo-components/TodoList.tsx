import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { IRootState } from '@/types';
import AddTodoModal from './AddTodoModal';

export default (props: any) => {
  const { navigation, route } = props;
  const todos = useSelector((state: IRootState) => state.todo.todos);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data: any) => {
    return (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={styles.rowFront}
        underlayColor={'#AAA'}>
        {/* <List.Item
          style={customStyles.todoListItem}
          title="First Item"
          description="Item description"
          left={(props) => <List.Icon {...props} icon="folder" />}
          underlayColor={"#AAA"}
        /> */}
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, data.item._id)}>
          <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderNoTodos = () => {
    return (
      <View>
        <Text>No todos found!</Text>
        <Button onPress={showModal}>Add Todo</Button>
      </View>
    );
  };

  const renderTodos = () => {
    return <View style={styles.container} />;
  };

  return (
    <>
      <AddTodoModal modalVisible={modalVisible} hideModal={hideModal} />
      {todos.length <= 0 ? renderNoTodos() : renderTodos()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 0,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

const customStyles = StyleSheet.create({
  todoListItem: {
    width: wp(80),
  },
});
