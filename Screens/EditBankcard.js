import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ImageBackground,
} from "react-native";

import Header from "../Components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";
import Constants from "expo-constants";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BigButton from "../Components/Buttons.js";
import { NoFragmentCyclesRule } from "graphql";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "FNB",
    cardName: "James",
    cardNumber: "4566 8789 2454 5456",
    cvv: 254,
    mm: "15",
    yy: "22",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Standard Bank",
    cardName: "Abraham",
    cardNumber: "6624 6962 4741 8517",
    cvv: 879,
    mm: "05",
    yy: "12",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Capitec",
    cardName: "jhkjhk",
    cardNumber: "9632 7877 6963 2145",
    cvv: 887,
    mm: "03",
    yy: "09",
  },
];
const EditBankcard = (props) => {
  const [isVisible, setisVisible] = useState(false);
  const [cardBankName, setcardBankName] = React.useState("");
  const [cardNumber, setcardNumber] = React.useState("");
  const [months, setmonths] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cvv, setCVV] = React.useState("");
  const [selectedCard, setselectedCard] = React.useState([{}]);
  const [cardName, setcardName] = React.useState("");
  const [doneEditing, setdoneEditing] = React.useState(true);
  const [locationSelected, setisClicked] = React.useState(false);

  const handler = (val) => {
    setselectedCard(val);
    setisClicked(true);
  };

  return (
    <View style={styles.container}>
      {DATA && DATA.length > 0 && locationSelected === false && (
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            width: wp(100),
          }}
          horizontal={true}
          data={DATA}
          renderItem={({ item }) => (
            <Item
              setisClicked={() => setisClicked(true)}
              id={item.id}
              title={item.title}
              mm={item.mm}
              cvv={item.cvv}
              cardNumber={item.cardNumber}
              cardName={item.cardName}
              title={item.title}
              item={item}
              selectedCard={selectedCard}
              props={props}
              handler={handler}
              yy={item.yy}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {DATA.length === 0 && (
        <Text
          style={{
            color: "black",
            alignSelf: "flex-start",
            fontWeight: "300",
            fontSize: RFValue(14),
            marginLeft: wp(10),
            marginBottom: hp(2),
          }}
        >
          You do not have any saved cards. Go to your{" "}
          <TouchableOpacity style={{ color: "blue" }}>
            Settings
          </TouchableOpacity>{" "}
          to add a card or{" "}
          <TouchableOpacity
            /* onPress={() =>Refresh cards list} */
            style={{ color: "blue" }}
          >
            Refresh
          </TouchableOpacity>{" "}
          your list
        </Text>
      )}
      {locationSelected === true && (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            width: wp(100),
            alignSelf: "center",
          }}
        >
          <TextInput
            underlineColor="#f2f2f2"
            mode={"flat"}
            style={{
              backgroundColor: "transparent",

              fontSize: RFValue(16),
              height: hp(10),

              paddingHorizontal: wp(3),
            }}
            label={selectedCard.title}
            value={cardBankName}
            onChangeText={(text) => {
              setcardBankName(text), setdoneEditing(true);
            }}
          />

          <TextInput
            underlineColor="#f2f2f2"
            mode={"flat"}
            style={{
              backgroundColor: "transparent",

              fontSize: RFValue(16),
              height: hp(10),
            }}
            label={selectedCard.cardName}
            value={cardName}
            onChangeText={(text) => {
              setcardName(text), setdoneEditing(true);
            }}
          />

          <TextInput
            underlineColor="#f2f2f2"
            mode={"flat"}
            style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: RFValue(16),
              height: hp(10),
            }}
            label={selectedCard.cardNumber}
            /* value={ cardNumber} */
            onChangeText={(text) => {
              setcardNumber(text), setdoneEditing(true);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(100),
            }}
          >
            <TextInput
              underlineColor="#f2f2f2"
              mode={"flat"}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: RFValue(14),
                height: hp(10),
                flex: 1,
              }}
              label={"mm"}
              value={months}
              onChangeText={(text) => {
                setmonths(text), setdoneEditing(true);
              }}
            />

            <TextInput
              underlineColor="#f2f2f2"
              mode={"flat"}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                color: "white",
                fontSize: RFValue(14),
                height: hp(10),
              }}
              label={"yy"}
              value={year}
              onChangeText={(text) => {
                setYear(text), setdoneEditing(true);
              }}
            />
          </View>
        </View>
      )}

      <View
        style={[
          styles.section,
          {
            flex: 0.4,
            alignSelf: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          },
        ]}
      >
        {locationSelected === true && (
          <BigButton styles={{ flex: 1 }} title={"Save Card"} />
        )}
        {locationSelected === true && (
          <BigButton
            styles={{ flex: 1 }}
            onPress={() => {
              setisClicked(false),
                setselectedCard(null),
                setcardName(""),
                setcardNumber(""),
                setmonths(""),
                setYear(""),
                setCVV(""),
                setdoneEditing(false);
            }}
            title={"Cancel"}
          />
        )}
      </View>
    </View>
  );
};
export function Item({
  handler,
  onChange,
  title,
  id,
  item,
  mm,
  cvv,
  cardNumber,
  selected,
  setselectedCard,
  cardName,
  selectedCard,
  yy,
  setisClicked,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handler(item);
        setisClicked();
      }}
      style={[
        styles.item,
        {
          width: wp(50),
          height: hp(20),
          alignSelf: "center",
        },
      ]}
    >
      {/* <ImageBackground
        source={require("../assets/backcardBack.jpg")}
        style={{
          flex: 1,
        }}
      />
      <Image
        source={require("../assets/chip.png")}
        style={{
          backgroundColor: "black",
          borderRadius: wp(3),
          height: hp(3),
          width: wp(8),
          resizeMode: "cover",
          position: "absolute",
          top: wp(7),
          left: wp(7),
        }}
      /> */}
      <Text
        style={{
          position: "absolute",
          top: wp(7),
          right: wp(9),
          fontSize: RFValue(11),

          color: "white",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          position: "absolute",
          top: wp(14),
          left: wp(5),
          color: "white",
          fontSize: RFValue(15),
        }}
      >
        {cardNumber}
      </Text>
      <Text
        style={{
          position: "absolute",
          top: wp(21),
          right: wp(9),
          color: "white",
          fontSize: RFValue(12),
        }}
      >
        {cardName}
      </Text>
      <Text
        style={{
          position: "absolute",
          top: wp(21),
          left: wp(5),
          color: "white",
          fontSize: RFValue(11),
        }}
      >
        {mm}
      </Text>
      <Text
        style={{
          position: "absolute",
          top: wp(21),
          left: wp(10),
          color: "white",
          fontSize: RFValue(11),
        }}
      >
        / {yy}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading3: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    margin: 24,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
    textAlign: "flex-start",
  },
  block: {
    width: wp(45),
    height: hp(10),
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
  },
  container2: {
    height: hp(50),

    justifyContent: "center",
  },
  section: {
    justifyContent: "center",

    width: "85%",
    height: hp(5),
    alignSelf: "flex-start",
  },
  item: {
    alignSelf: "center",
    width: wp(50),
    height: hp(17),
    borderRadius: wp(2),
    padding: wp(2),
  },
  title: {
    fontSize: 22,
    marginLeft: wp(5),
    marginTop: wp(5),
  },
});

export default EditBankcard;
