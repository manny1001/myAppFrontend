import {
  React,
  useState,
  View,
  Text,
  TouchableOpacity,
  wp,
  hp,
  RFValue,
} from "../api/constants";

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
        marginTop: hp(2),
        flex: 1,
        width: wp(80),
        alignSelf: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          alignSelf: "stretch",
        }}
      >
        <View
          style={{
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
                justifyContent: "space-around",
                alignSelf: "stretch",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  height: hp(6),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    color: "silver",
                    fontSize: RFValue(14),
                  }}
                >
                  ID:
                </Text>
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    color: "black",
                    fontSize: RFValue(16),
                  }}
                >
                  {uuidTrip.slice(3, 7)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  height: hp(6),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "silver",

                    fontSize: RFValue(14),
                  }}
                >
                  Total amount:
                </Text>
                <Text
                  style={{
                    color: "black",

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
                }}
              >
                <Text
                  style={{
                    color: "silver",
                    fontSize: RFValue(14),
                  }}
                >
                  Status:
                </Text>
                <Text
                  style={{
                    color: "black",
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
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    alignSelf: "center",
                    color: "silver",
                  }}
                >
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
                  <Text
                    style={{
                      fontFamily: "Gotham_Medium_Regular",
                      alignSelf: "center",
                      color: "silver",
                    }}
                  >
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
