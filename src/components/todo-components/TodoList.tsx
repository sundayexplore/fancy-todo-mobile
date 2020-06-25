import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ITodo } from '@/types';

export interface TodoListProps {
  todos: ITodo[];
}

export default ({ todos }: TodoListProps) => {
  // const renderItem = (data: any) => {
  //   return (
  //     <TouchableHighlight
  //       onPress={() => console.log('You touched me')}
  //       style={styles.rowFront}
  //       underlayColor={'#AAA'}>
  //       {/* <List.Item
  //         style={customStyles.todoListItem}
  //         title="First Item"
  //         description="Item description"
  //         left={(props) => <List.Icon {...props} icon="folder" />}
  //         underlayColor={"#AAA"}
  //       /> */}
  //     </TouchableHighlight>
  //   );
  // };

  // const renderHiddenItem = (data: any, rowMap: any) => {
  //   return (
  //     <View style={styles.rowBack}>
  //       <Text>Left</Text>
  //       <TouchableOpacity
  //         style={[styles.backRightBtn, styles.backRightBtnLeft]}
  //         onPress={() => closeRow(rowMap, data.item._id)}>
  //         <Text style={styles.backTextWhite}>Close</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const renderTodos = () => {
    return <View style={styles.container} />;
  };

  return renderTodos();
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
