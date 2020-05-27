import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

import { Props, TodoList } from '@/components';

import styles from '@/styles';

export default ({navigation, route}: Props) => {
  return (
    <View style={styles.defaultContainer}>
      <KeyboardAvoidingView>
        <TodoList navigation={navigation} route={route} />
      </KeyboardAvoidingView>
    </View>
  )
}
