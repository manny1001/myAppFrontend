import React, { lazy, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-paper";
const BigButton = lazy(() => import("../Components/Buttons"));
export default function AddBankCard(props) {
  const [cardName, setcardName] = React.useState("");
  const [cardNumber, setcardNumber] = React.useState("");
  const [months, setmonths] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cvv, setCVV] = React.useState("");
  const [doneEditing, setdoneEditing] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "#f2f2f2",
            width: wp(100),
          }}
        >
          <Text
            style={{
              fontSize: RFValue(18),
              fontWeight: "300",
              alignSelf: "center",
            }}
          >
            New bank card added
          </Text>
          {/*  <MaterialIcons
            name="done"
            size={wp(15)}
            color="black"
            style={{ alignSelf: "center" }}
          /> */}
          <BigButton
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
            title={"Done"}
          />
          <TouchableOpacity
            onPress={() => {
              {
                setModalVisible(!modalVisible),
                  props.navigation.navigate("EditBankcard");
              }
            }}
          >
            <Text
              style={{
                fontSize: RFValue(14),
                fontWeight: "300",
                alignSelf: "center",
              }}
            >
              View cards
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ADDCARD
        setcardName={setcardName}
        setcardNumber={setcardNumber}
        setmonths={setmonths}
        setYear={setYear}
        setCVV={setCVV}
        setdoneEditing={setdoneEditing}
        style={{ flex: 1, justifyContent: "space-evenly" }}
        cardName={cardName}
        cardNumber={cardNumber}
        months={months}
        year={year}
        cvv={cvv}
        doneEditing={doneEditing}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
export const ADDCARD = ({
  cardName,
  cardNumber,
  months,
  year,
  cvv,
  logos,
  doneEditing,
  style,
  setModalVisible,
  setcardName,
  setcardNumber,
  setCVV,
  setYear,
  setmonths,
}) => {
  return (
    <View style={style}>
      {logos !== "none" && (
        <View
          style={{
            width: wp(75),
            flex: 0.5,
            alignSelf: "center",
            justifyContent: "space-betwenn",
            flexDirection: "row",
          }}
        ></View>
      )}

      <View style={[styles.section, { height: hp(10) }]}>
        <TextInput
          mode={"flat"}
          style={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: RFValue(16),
            height: hp(8),
            paddingHorizontal: wp(3),
          }}
          label="Name on Card"
          value={cardName}
          onChangeText={(text) => setcardName(text)}
        />
      </View>
      <View style={[styles.section, { height: hp(10) }]}>
        <TextInput
          mode={"flat"}
          style={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: RFValue(16),
            height: hp(8),
            paddingHorizontal: wp(3),
          }}
          label="Card Number"
          value={cardNumber}
          onChangeText={(text) => setcardNumber(text)}
        />
      </View>

      <View
        style={[
          styles.section,
          {
            height: hp(14),
            width: wp(90),
            alignSelf: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            height: hp(14),
            width: wp(90),
            justifyContent: "space-evenly",
          }}
        >
          <View style={[styles.section, { width: wp(20), height: hp(6) }]}>
            <TextInput
              mode={"flat"}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: RFValue(16),
                height: hp(8),
              }}
              label="mm"
              value={months}
              onChangeText={(text) => setmonths(text)}
            />
          </View>
          <View style={[styles.section, { width: wp(25), height: hp(6) }]}>
            <TextInput
              mode={"flat"}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: RFValue(16),
                height: hp(8),
              }}
              label="yyyy"
              value={year}
              onChangeText={(text) => setYear(text)}
            />
          </View>
          <View style={[styles.section, { width: wp(20), height: hp(6) }]}>
            <TextInput
              mode={"flat"}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: RFValue(16),
                height: hp(8),
              }}
              label="CVV"
              value={cvv}
              onChangeText={(text) => setCVV(text)}
            />
          </View>
        </View>
      </View>
      {doneEditing === true && (
        <BigButton
          title={"Add"}
          onPress={() => {
            setModalVisible(true);
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    justifyContent: "space-evenly",
  },
  container2: {
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  section: {
    justifyContent: "center",

    width: "85%",
    height: hp(10),
    alignSelf: "center",
  },
  item: {
    alignSelf: "center",
    width: wp(100),
    borderWidth: 3,
    height: hp(25),
  },
  title: {
    fontSize: 32,
  },
});
