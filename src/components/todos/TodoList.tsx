import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";

import { State } from "../../reducers";
import { Props, TodoLeftMenu } from "../";

export default ({ navigation, route }: Props) => {
  const todos = useSelector((state: State) => state.todoReducer.todos);

  const data = [
    { key: 1, label: "Label 1", leftLabel: "Left 1", rightLabel: "Right 1" },
    { key: 2, label: "Label 2", leftLabel: "Left 2", rightLabel: "Right 2" },
    { key: 3, label: "Label 3", leftLabel: "Left 3", rightLabel: "Right 3" },
    { key: 4, label: "Label 4", leftLabel: "Left 4", rightLabel: "Right 4" },
    { key: 5, label: "Label 5", leftLabel: "Left 5", rightLabel: "Right 5" }
  ];

  const renderNoTodos = () => {
    return (
      <View>
        <Text>No todos found!</Text>
      </View>
    );
  }

  const renderTodos = () => {
    return (
      <View>
        <SwipeableFlatList
        data={data}
        renderItem={({ item }: any) => (
          <Text style={{ height: 48 }}>{item.label}</Text>
        )}
        renderLeft={({ item }: any) => (
          <TodoLeftMenu style={{ width: 60 }} />
        )}
        renderRight={({ item }: any) => (
          <Text style={{ width: 100 }}>{item.rightLabel}</Text>
        )}
        backgroundColor={"white"}
      />
      </View>
    );
  }

  return renderTodos();
};
