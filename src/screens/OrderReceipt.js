import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import BigButton from "../components/Buttons.js";
export default function App(props) {
  const { onPress, orderObject } = props;
  /*  const {
    destination,
    location,
    totalAmount,
    drivername,
    driversurname,
  } = orderObject; */
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
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
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
              {orderObject && orderObject.createdAt}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              width: wp(50),
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
              "Driver Name"
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                alignSelf: "center",
              }}
            >
              "Driver Registration"
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
        </View>

        <ScrollView>
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
              {orderObject && orderObject.location}
            </Text>
            <Text
              style={{
                fontSize: RFValue(14),
                width: wp(30),
                alignSelf: "center",
              }}
            >
              {orderObject && orderObject.destination}
            </Text>
            <Text
              style={{
                fontSize: RFValue(14),
                width: wp(20),
                alignSelf: "center",
                marginLeft: wp(15),
              }}
            >
              R {orderObject && orderObject.totalAmount}
            </Text>
          </View>
        </ScrollView>
      </>

      {/* <View
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
            {orderObject && orderObject.totalAmount}
          </Text>
        </View>
      </View> */}
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
        <BigButton
          title={"Done"}
          onPress={() => {
            onPress();
          }}
          titleStyle={{
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
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
