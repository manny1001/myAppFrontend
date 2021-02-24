//import liraries
import React, { lazy } from "react";
import styles from "../styles";
import Modal from "modal-enhanced-react-native-web";
import { FlatList, View, Text } from "react-native";
const OrderReceipt = lazy(() => import("../../src/screens/OrderReceipt.js"));
const SendTipModal = lazy(() => import("../../src/components/SendTipModal"));
const Order = lazy(() => import("../../src/components/Order"));
const PaymentHistoryPresentational = ({
  visibleModal,
  orderObject,
  TipModalVisible,
  data,
  onBackdropPress,
  setvisibleModal,
  settTipModalVisible,
  setorderObject,
}) => {
  return (
    <>
      <Modal isVisible={visibleModal} onBackdropPress={() => onBackdropPress()}>
        <OrderReceipt
          onPress={() => setvisibleModal(false)}
          orderObject={orderObject.item}
        />
      </Modal>
      <SendTipModal
        TipModalVisible={TipModalVisible}
        settTipModalVisible={settTipModalVisible()}
      />

      <View style={[styles.container, { marginTop: 50 }]}>
        {data && data.getRequestHistory.length === 0 && (
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: "Gotham_Medium_Regular",
                alignSelf: "center",
                flexWrap: "wrap",
              }}
            >
              Seems like you havent request a trip yet...
            </Text>
          </View>
        )}
        {data && data.getRequestHistory.length !== 0 && (
          <FlatList
            data={data.getRequestHistory}
            renderItem={(item) => (
              <Order
                setvisibleModal={setvisibleModal}
                settTipModalVisible={settTipModalVisible}
                setorderObject={setorderObject}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
};

export default PaymentHistoryPresentational;
