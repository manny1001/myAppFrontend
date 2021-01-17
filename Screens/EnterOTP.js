import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
const CELL_COUNT = 4;
const EnterOTP = ({ props, OTP, onPress, OTPHandler, CellNumber }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const DelayedFunction = ({ handler, OTP, onPress, value }) => {
    {
      OTP === value ? onPress() : handler(false);
    }
    return null;
  };
  const handler = (val) => {
    setisEqual(val);
  };
  const [isEqual, setisEqual] = useState(true);
  OTPHandler(isEqual);
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
      <Text style={{ textAlign: "center", fontSize: 30, color: "white" }}>
        Verification Code
      </Text>
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontSize: RFPercentage(1.5),
        }}
      >
        Enter the OTP sent to the mobile number {CellNumber}
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
      {value.length === 4 && (
        <DelayedFunction
          onPress={onPress}
          OTP={OTP}
          props={props}
          value={value}
          handler={handler}
        />
      )}
    </View>
  );
};

export default EnterOTP;
