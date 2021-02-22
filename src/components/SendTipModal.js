import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Modal from "modal-enhanced-react-native-web";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-paper";

import { Button } from "react-native-elements";
export const SendTipModal = ({ TipModalVisible, settTipModalVisible }) => {
  const [tipAmount, setTipAmonut] = useState("");
  return (
    <View>
      <Modal
        onBackdropPress={() => settTipModalVisible(false)}
        style={{
          height: hp(100),
          width: wp(100),
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "transparent",
        }}
        isVisible={TipModalVisible}
      >
        <View
          style={{
            marginTop: hp(2),
            borderWidth: wp(0.05),
            width: wp(90),
            alignSelf: "center",
            borderRadius: 5,
            elevation: 10,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(22),
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Send tip
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: wp(90),
              alignSelf: "center",

              justifyContent: "space-Send",
            }}
          >
            <View
              style={{
                flexDirecction: "row",
                width: wp(60),
                height: hp(15),
                alignSelf: "center",

                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(58),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </Text>
                <Text>John Keneddy</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(58),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    fontWeight: "bold",
                  }}
                >
                  Registration
                </Text>
                <Text>CX 01 BC GP</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(58),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    fontWeight: "bold",
                  }}
                >
                  Vehicle Type
                </Text>
                <Text>Hyundai i20</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: wp(50),
              flexDirection: "row",

              alignItems: "center",
              marginTop: hp(2),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(22),
                marginLeft: wp(20),
                alignSelf: "center",
              }}
            >
              R
            </Text>
            <TextInput
              mode={"flat"}
              style={{
                marginTop: hp(2),
                marginLeft: wp(5),
                width: wp(30),
                backgroundColor: "transparent",
                color: "black",
                fontSize: RFValue(16),
                height: hp(5),
                alignSelf: "center",
              }}
              onChangeText={(text) => setTipAmonut(text)}
            />
          </View>
          <View
            style={{
              width: wp(80),

              justifyContent: "center",
              alignSelf: "center",
              height: hp(15),
            }}
          >
            <Button
              onPress={() => {
                settTipModalVisible(false);
              }}
              style={{ alignSelf: "center" }}
              title={"Send Tip"}
              type="outline"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});
export default SendTipModal;
