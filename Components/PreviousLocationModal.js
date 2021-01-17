import React, { lazy, Suspense } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const BigButton = lazy(() => import("../Components/Buttons"));
import { PrevLocations } from "../DATA";
import Loader from "../navigation/Loader";
const PreviousLocationModal = ({
  visible,
  onPress,
  onPress2,
  onPress3,
  value,
}) => {
  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      visible={visible}
    >
      <View
        style={{
          backgroundColor: "#f5f5f5",
          width: wp(100),
          flex: 1,
          alignSelf: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: RFPercentage(2),
          }}
        >
          Travelling to one of these destinations?
        </Text>
        <View
          style={{
            height: hp(40),
            width: wp(80),
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              width: wp(80),
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            {PrevLocations.map((res) => {
              return (
                <TouchableOpacity
                  onPress={() => onPress(res)}
                  key={res.key}
                  style={{
                    marginBottom: 35,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: "#3740ff",
                      alignItems: "center",
                      justifyContent: "center",

                      flexDirection: "row",
                    }}
                  >
                    {value === res.key && (
                      <View
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 50,
                          backgroundColor: "#3740ff",
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      marginRight: 35,
                      fontSize: 16,
                      color: "#000",
                      fontWeight: "400",

                      marginLeft: wp(3),
                    }}
                  >
                    {res.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity onPress={onPress2} style={{ height: hp(5) }}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: RFValue(19),
              marginLeft: wp(11),
              color: "red",
            }}
          >
            No
          </Text>
        </TouchableOpacity>
        <BigButton
          disabled={value === null ? true : false}
          onPress={onPress3}
          title={"Use Address"}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
      </View>
    </Modal>
  );
};

export default PreviousLocationModal;
