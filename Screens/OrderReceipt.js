import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export default function App({ onPress, orderObject }) {
  const [DataSet, setDataset] = useState();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp(80),
          height: hp(10),
          alignSelf: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            marginLeft: wp(2),
            fontWeight: "bold",
            fontSize: RFValue(28),
            alignSelf: "center",
          }}
        >
          Receipt
        </Text>
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12),
                alignSelf: "center",
              }}
            >
              {orderObject.Date}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              width: wp(35),

              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(13),
                alignSelf: "center",
              }}
            >
              {orderObject.Driver}
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                alignSelf: "center",
              }}
            >
              {orderObject.Registration}
            </Text>
          </View>
        </View>
      </View>

      <>
        <View
          style={{
            flex: 0.1,
            borderBottomWidth: 2,
            width: "95%",
            alignSelf: "center",
            borderColor: "#d3d3d3",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#d3d3d3",
          }}
        >
          {orderObject.Type === "FastFoodOrder" ? (
            <>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(20),
                  alignSelf: "center",
                }}
              >
                Qty
              </Text>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(60),
                  alignSelf: "center",
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(20),
                  alignSelf: "center",
                }}
              >
                Price
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(30),
                  alignSelf: "center",
                }}
              >
                Departure
              </Text>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(30),
                  alignSelf: "center",
                  marginRight: wp(9),
                }}
              >
                Destination
              </Text>
              <Text
                style={{
                  fontSize: RFValue(16),
                  width: wp(20),
                  alignSelf: "center",
                  marginRight: wp(1),
                }}
              >
                Price
              </Text>
            </>
          )}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flex: 0.5,
            width: "95%",
            alignSelf: "center",
          }}
          data={orderObject.Description}
          renderItem={({ item }) => {
            {
              return orderObject.Type === "FastFoodOrder" ? (
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor: "#d3d3d3",
                    width: "95%",
                    alignSelf: "center",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(20),
                      alignSelf: "center",
                    }}
                  >
                    {item.Qty}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(60),
                      alignSelf: "center",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(20),
                      alignSelf: "center",
                    }}
                  >
                    R {item.Total}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor: "#d3d3d3",
                    width: "95%",
                    alignSelf: "center",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(30),
                      alignSelf: "center",
                    }}
                  >
                    {item.Departure}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(30),
                      alignSelf: "center",
                    }}
                  >
                    {item.Destination}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      width: wp(20),
                      alignSelf: "center",
                      marginLeft: wp(15),
                    }}
                  >
                    R {item.Total}
                  </Text>
                </View>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </>

      <View
        style={{
          flex: 0.1,
          alignSelf: "center",
          width: wp(75),
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            width: wp(25),
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              alignSelf: "center",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontSize: RFValue(18),
              alignSelf: "center",
              marginRight: wp(5),
            }}
          >
            {orderObject.Total}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: "5%",
          width: "90%",
          flex: 0.15,

          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: "30%",
            height: "40%",
            backgroundColor: "black",
            alignSelf: "center",
            borderRadius: 100,
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 22, color: "white" }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
});
