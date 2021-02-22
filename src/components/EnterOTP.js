//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const EnterOTP = () => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: RFPercentage(3),
          alignSelf: "center",
          color: "white",
        }}
      >
        OTP is: 4545
      </Text>
      <Text
        style={{
          fontFamily: "Gotham_Medium_Regular",
          textAlign: "center",
          fontSize: 30,
          color: "white",
        }}
      >
        Verification Code
      </Text>
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontSize: RFPercentage(1.5),
        }}
      >
        Enter the OTP sent to the mobile number *******7765
      </Text>
      <CodeField
        ref={ref}
        {...cellOnLayout}
        value={value}
        onChangeText={(value) => setValue(value)}
        cellCount={CELL_COUNT}
        rootStyle={{
          width: wp(80),

          height: hp(10),
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              {
                width: wp(15),
                height: hp(10),
                backgroundColor: "geeen",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "white",
                borderBottomWidth: 5,
              },
              isFocused && {
                borderBottomColor: "#007AFF",
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: 36,
                textAlign: "center",
              }}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {/* <View
          style={{
            height: hp(20),
            width: wp(80),
            justifyContent: "center",
            position: "absolute",
            bottom: hp(10),
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "black",
              fontWeight: "800",
              fontSize: RFPercentage(2),
              marginTop: hp(5),
            }}
          >
            Incorrect otp,Please try again.
          </Text>
        </View> */}
    </View>
  );
};

export default EnterOTP;
