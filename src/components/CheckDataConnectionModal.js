import { React, Modal, View, Text } from "../api/constants";
const CheckDataConnectionModal = ({ isConnected }) => {
  return (
    <Modal
      backdropOpacity={1}
      isVisible={!isConnected}
      onBackdropPress={() => {}}
    >
      {
        <View style={{}}>
          <Text style={{ fontFamily: "Gotham_Medium_Regular", color: "white" }}>
            No internet connection. Please enable your network connection.
          </Text>
        </View>
      }
    </Modal>
  );
};

export default CheckDataConnectionModal;
