import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider, Modal, Portal, Text } from "react-native-paper";

export default (props: any) => {
  const { navigation, route, modalVisible, showModal, hideModal } = props;

  return (
    <Portal>
      <Modal contentContainerStyle={customStyles.modalContainer} visible={modalVisible} onDismiss={hideModal}>
        <Text>Example Modal</Text>
      </Modal>
    </Portal>
  );
};

const customStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
