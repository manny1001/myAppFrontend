import React, { useState, lazy } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StoreData } from "../GFunctions";
import { useQuery } from "@apollo/client";
import { GET_REQUEST_HISTORY, GET_USER_UUID } from "../Queries";
import Modal from "modal-enhanced-react-native-web";
import Loader from "../Components/Loader";
const OrderReceipt = lazy(() => import("./OrderReceipt"));
const SendTipModal = lazy(() => import("../Components/SendTipModal"));
const Order = lazy(() => import("../Components/Order"));

const Payments = () => {
  const [currentUserUUID, setcurrentUserUUID] = useState("");
  const { data: DATA, loading: LOADING } = useQuery(GET_USER_UUID, {
    onCompleted: () => {
      setcurrentUserUUID(DATA.currentUser.uuid),
        StoreData("useruuid", DATA.currentUser.uuid);
    },
  });
  const { data, loading, error } = useQuery(GET_REQUEST_HISTORY, {
    variables: { uuidUser: currentUserUUID },
  });
  const [visibleModal, setvisibleModal] = useState(false);
  const [orderObject, setorderObject] = useState({});
  const [TipModalVisible, settTipModalVisible] = useState();

  if (loading) return <Loader />;
  return (
    <>
      <Modal
        isVisible={visibleModal}
        onBackdropPress={() => setvisibleModal(false)}
      >
        <OrderReceipt
          onPress={() => setvisibleModal(false)}
          orderObject={orderObject.item}
        />
      </Modal>
      <SendTipModal
        TipModalVisible={TipModalVisible}
        settTipModalVisible={() => settTipModalVisible(false)}
      />

      <ScrollView style={{ height: hp(100), width: wp(100), marginTop: hp(2) }}>
        {data && data.getRequestHistory.length === 0 && (
          <View
            style={{
              justifyContent: "center",
              height: hp(80),
              width: wp(80),
              alignSelf: "center",
            }}
          >
            <Text style={{ alignSelf: "center" }}>
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
      </ScrollView>
    </>
  );
};

export default Payments;
