import React, {useState} from "react";
import { View, SwipeableListView } from "react-native";
import { useSelector } from "react-redux";

import { State } from '../../reducers';
import { Props } from "../";

export default ({ navigation, route }: Props) => {
  const todos = useSelector((state: State) => state.todoReducer.todos);
  const [swipeableList, setSwipeableList] = useState(null);

  return (
    <View>
      <SwipeableListView
        ref={(ref: any) => setSwipeableList(ref)}
        data={todos}
        keyExtractor={(item: any) => item._id}
        maxSwipeDistance={25}
        bounceFirstRowOnMount={true}
        // renderQuickActions={}
      />
    </View>
  );
};
