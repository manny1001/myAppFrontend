import React, { useState, lazy } from "react";
import { FlatList, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { OrderHistory } from "./FakeData";
import Modal from "modal-enhanced-react-native-web";
const OrderReceipt = lazy(() => import("./OrderReceipt"));
const SendTipModal = lazy(() => import("../Components/SendTipModal"));
const Order = lazy(() => import("../Components/Order"));

const Payments = ({ navigation: { goBack } }) => {
  const [visibleModal, setvisibleModal] = useState(false);
  const [orderObject, setorderObject] = useState({});
  const [TipModalVisible, settTipModalVisible] = useState();
  return (
    <>
      <Modal
        isVisible={visibleModal}
        onBackdropPress={() => setvisibleModal(false)}
      >
        <OrderReceipt
          onPress={() => setvisibleModal(false)}
          orderObject={orderObject}
          setorderObject={setorderObject}
        />
      </Modal>
      <SendTipModal
        TipModalVisible={TipModalVisible}
        settTipModalVisible={() => settTipModalVisible(false)}
      />

      <ScrollView style={{ height: hp(100), width: wp(100), marginTop: hp(2) }}>
        <FlatList
          data={OrderHistory}
          renderItem={(item) => (
            <Order
              item={item}
              setvisibleModal={setvisibleModal}
              settTipModalVisible={settTipModalVisible}
              setorderObject={setorderObject}
            />
          )}
          keyExtractor={(item) => item.ID}
        />
      </ScrollView>
    </>
  );
};

export default Payments;
