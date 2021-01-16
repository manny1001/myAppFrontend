import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Header from "../Components/Header";
import { OrderHistory } from "./FakeData";
import Modal from "modal-enhanced-react-native-web";
import OrderReceipt from "./OrderReceipt";
import SendTipModal from "../Components/SendTipModal";
const OrderIcon = ({ param }) => {
  switch (param) {
    case "Preparing":
      return;
    case "Cancelled":
      return {
        /* <MaterialIcons
          name="cancel"
          size={wp(4.5)}
          color="red"
          style={{ marginRight: wp(2), alignSelf: "center" }}
        /> */
      };
    case "Completed":
      return {
        /* <AntDesign
          size={wp(4.5)}
          name="checkcircleo"
          color="green"
          style={{ marginRight: wp(2), alignSelf: "center" }}
        /> */
      };
    case "Processing":
      return {
        /* <AntDesign
          name="hourglass"
          size={wp(4.5)}
          color="orange"
          style={{ marginRight: wp(2), alignSelf: "center" }}
        /> */
      };
    case "Active":
      return {
        /* <MaterialIcons
          name="timer"
          size={wp(5.5)}
          color="green"
          style={{
            marginRight: wp(1.5),
            alignSelf: "center",
            fontWeight: "100",
          }}
        /> */
      };
    default:
      return <></>;
  }
};
const Order = ({
  item,
  setvisibleModal,
  settTipModalVisible,
  setorderObject,
  orderObject,
}) => {
  const [isPressed, setisPressed] = useState(false);
  const [isFocused, lostFocus] = useState(false);
  const [hide, setHide] = useState(false);
  const Order = item.item;

  return (
    <TouchableOpacity
      /*   onBlur={() => setisPressed(false)} */
      onPress={() => setisPressed(!isPressed)}
      style={{
        marginTop: hp(1),
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          alignSelf: "center",
          elevation: 50,
          width: wp(95),
          borderRadius: wp(1),
        }}
      >
        <View
          style={{
            width: wp(95),
            height: hp(5),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "silver",
              marginLeft: wp(4),
              fontSize: RFValue(12),
            }}
          >
            {Order.Date}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: isPressed === true ? "black" : "silver",
                fontSize: RFValue(16),
                marginRight: wp(4),
              }}
            >
              {Order.Name}
            </Text>
            {/* {isPressed === false ? <OrderIcon param={Order.Status} /> : <></>} */}
          </View>
        </View>
        {isPressed === true && (
          <>
            <View
              style={{
                flexDirection: "row",
                width: wp(95),
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  height: hp(6),
                  justifyContent: "space-between",
                  width: wp(26),
                  marginLeft: wp(4),
                }}
              >
                <Text style={{ color: "silver", fontSize: RFValue(14) }}>
                  ID:
                </Text>
                <Text style={{ color: "black", fontSize: RFValue(16) }}>
                  {Order.ID}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  height: hp(6),
                  justifyContent: "space-between",
                  width: wp(30),
                  marginLeft: wp(4),
                }}
              >
                <Text
                  style={{
                    color: "silver",
                    marginRight: wp(4),
                    fontSize: RFValue(14),
                  }}
                >
                  Total amount:
                </Text>
                <Text
                  style={{
                    color: "black",
                    marginRight: wp(5),
                    fontSize: RFValue(16),
                    alignSelf: "center",
                  }}
                >
                  R {Order.Total}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  flexDirection: "column",
                  height: hp(6),
                  justifyContent: "space-between",
                  width: wp(25),
                  marginLeft: wp(4),
                }}
              >
                <Text
                  style={{
                    color: "silver",
                    marginRight: wp(5),
                    fontSize: RFValue(14),
                  }}
                >
                  Status:
                </Text>
                <Text
                  style={{
                    color: "black",
                    marginRight: wp(5),
                    fontSize: RFValue(18),
                    color:
                      Order.Status === "Completed" ? (
                        "green"
                      ) : Order.Status === "Processing" ? (
                        "orange"
                      ) : Order.Status === "Cancelled" ? (
                        "red"
                      ) : Order.Status === "Picked-Up" ? (
                        "purple"
                      ) : (
                        <></>
                      ),
                    fontWeight: "bold",
                  }}
                >
                  {Order.Status}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: hp(1),
                width: wp(95),
                height: hp(6),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  {
                    setvisibleModal(true), setorderObject(Order);
                  }
                }}
                style={{
                  borderRadius: wp(1),
                  marginLeft: wp(4),
                  width: wp(20),
                  borderColor: "silver",
                  borderWidth: 1,
                  height: hp(4),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ alignSelf: "center", color: "silver" }}>
                  View
                </Text>
              </TouchableOpacity>

              {Order.Status === "Active" && (
                <TouchableOpacity
                  href={"https://Google.com"}
                  accessibilityRole="link"
                  target="_blank"
                  style={{
                    marginRight: wp(40),
                    right: 0,
                    borderRadius: wp(1),
                    position: "absolute",
                    width: wp(20),
                    borderColor: "silver",
                    borderWidth: 0.2,
                    height: hp(4),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", color: "silver" }}>
                    Track
                  </Text>
                </TouchableOpacity>
              )}
              {Order.Status === "Completed" && (
                <TouchableOpacity
                  onPress={() => settTipModalVisible(true)}
                  style={{
                    marginRight: wp(40),
                    right: 0,
                    borderRadius: wp(1),
                    position: "absolute",
                    width: wp(20),
                    borderColor: "silver",
                    borderWidth: 0.2,
                    height: hp(4),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", color: "silver" }}>
                    Send Tip
                  </Text>
                </TouchableOpacity>
              )}
              {Order.paymentType == "Cash" && (
                <>
                  <Text
                    style={{
                      right: 0,
                      position: "absolute",
                      marginRight: wp(5),
                      fontSize: RFValue(14),
                    }}
                  >
                    {Order.paymentType}
                  </Text>
                </>
              )}
              {Order.paymentType === "Card" && (
                <View
                  style={{
                    right: 0,
                    position: "absolute",
                    marginRight: wp(4),
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      marginRight: wp(2),
                      alignSelf: "center",
                      fontSize: RFValue(14),
                    }}
                  >
                    {Order.paymentType}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
const Orders = ({ navigation: { goBack } }) => {
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

      {/* <Text
        style={{
          marginLeft: wp(8),
          fontSize: RFValue(22),
          fontWeight: "bold",
        }}
      >
        Your Payments
      </Text> */}
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

export default Orders;
