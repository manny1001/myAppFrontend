import React, { useState, lazy } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const Order = (props) => {
  const [isPressed, setisPressed] = useState(false);
  const {
    uuidTrip,
    createdAt,
    location,
    destination,
    totalAmount,
    status,
    drivername,
    driversurname,
    driverregistration,
    model,
    tip,
  } = props.item.item;
  const { settTipModalVisible, setvisibleModal, setorderObject, item } = props;
  return (
    <TouchableOpacity
      onPress={() => setisPressed(!isPressed)}
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
        width: wp(80),
        alignSelf: "center",
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
            {Date(createdAt).split("G")[0]}
          </Text>
          {isPressed === false && (
            <Text
              style={{
                marginRight: wp(5),
                fontSize: RFValue(14),
                color:
                  status === "Complete" ? (
                    "green"
                  ) : status === "Active" ? (
                    "orange"
                  ) : status === "Cancelled" ? (
                    "red"
                  ) : (
                    <></>
                  ),
                fontWeight: "600",
              }}
            >
              {status}
            </Text>
          )}
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
                  {uuidTrip.slice(3, 7)}
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
                  R {totalAmount}
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
                      status === "Complete" ? (
                        "green"
                      ) : status === "Active" ? (
                        "orange"
                      ) : status === "Cancelled" ? (
                        "red"
                      ) : (
                        <></>
                      ),
                    fontWeight: "bold",
                  }}
                >
                  {status}
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
                    setvisibleModal(true), setorderObject(item);
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

              {status === "Completed" && (
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

export default Order;
