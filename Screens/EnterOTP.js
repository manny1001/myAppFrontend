import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
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
import { RFValue } from "react-native-responsive-fontsize";
import { Button } from "react-native-elements";
import Header from "../Components/Header";
import { Overlay } from "react-native-elements";
import { TabRouter } from "@react-navigation/native";
const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 30, color: "white" },
  codeFieldRoot: {
    marginTop: hp(5),
    width: wp(80),
    marginLeft: "auto",

    marginRight: "auto",
    height: hp(10),
  },
  cellRoot: {
    width: wp(15),
    height: hp(10),

    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  cellText: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
});
const CELL_COUNT = 4;

const EnterOTP = ({ props, OTP, onPress, OTPHandler, CellNumber }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const DelayedFunction = ({
    handler,
    props,
    onChange,
    OTP,
    onPress,
    value,
  }) => {
    {
      OTP === value ? onPress() : handler(false);
    }
    return null;
  };
  const handler = (val) => {
    setisEqual(val);
  };
  const [visible, setVisible] = useState(false);
  const [OTPCorrect, setOTPCorrect] = useState(false);
  const [isEqual, setisEqual] = useState(true);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  OTPHandler(isEqual);
  return (
    <SafeAreaView
      style={{
        width: wp(100),
        height: hp(100),
        backgroundColor: "#3D4849",
      }}
    >
      <View
        style={{
          width: wp(100),
          height: hp(57),
          alignItems: "center",
          marginTop: hp(20),
        }}
      >
        <Text style={[styles.title, {}]}>Verification Code</Text>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: RFValue(12),
            marginTop: hp(5),
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
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
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
      {/*   <Button
        onPress={() => {
           props.navigation.navigate("AcceptTandCs")  
          props.onPress();
        }}
        title={"Done"}
        buttonStyle={{
          height: hp(10),
          width: wp(80),
          alignSelf: "center",
          backgroundColor: "#58c3ea",
        }}
      />    */}
    </SafeAreaView>
  );
};

export default EnterOTP;
