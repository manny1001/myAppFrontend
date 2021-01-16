import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "FNB",
    cardName: "James",
    cardNumber: "4566 8789 2454 5456",
    cvv: 254,
    mm: "15 / 22",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Standard Bank",
    cardName: "Abraham",
    cardNumber: "6624 6962 4741 8517",
    cvv: 879,
    mm: "05 / 26",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Capitec",
    cardName: "jhkjhk",
    cardNumber: "9632 7877 6963 2145",
    cvv: 887,
    mm: "03 / 21",
  },
];
export function Item({
  touchable,
  setnewnewDATA,
  NewDATA,
  setnewDATA,
  title,
  id,
  item,
  mm,
  cvv,
  height,
  cardNumber,
  selected,
  setselectedCard,
  cardName,
  setcardselected,
}) {
  return (
    <TouchableOpacity
      onPress={
        touchable === false
          ? null
          : () => {
              const selectedCard = item;
              const withoutSelected = NewDATA.filter((item) => item.id !== id);
              setselectedCard(item),
                setnewnewDATA(withoutSelected),
                setcardselected(true);
            }
      }
      style={[
        styles.item,
        {
          width: selected ? wp(55) : wp(50),
          height: height ? height : hp(20),
          alignSelf: "center",
        },
      ]}
    >
      <ImageBackground
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
      />
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
    </TouchableOpacity>
  );
}
export default function SelectBankCard({
  style,
  closeModal,
  title,
  setcardselected,
  setselectedCard,
}) {
  const [selected, setSelected] = React.useState(new Map());
  const [NewDATA, setNewDATA] = React.useState(DATA);
  const newSelected = new Map(selected);
  const onSelect = React.useCallback(
    (id) => {
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );
  const setnewnewDATA = (val) => {
    setNewDATA(val);
  };
  return NewDATA && NewDATA.length > 0 ? (
    <View
      style={[
        style,
        styles.container2,
        {
          alignSelf: "center",
          width: wp(90),

          justifyContent: "center",
        },
      ]}
    >
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
        }}
        horizontal={true}
        data={NewDATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            mm={item.mm}
            cvv={item.cvv}
            cardNumber={item.cardNumber}
            cardName={item.cardName}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
            item={item}
            setselectedCard={setselectedCard}
            NewDATA={NewDATA}
            setnewnewDATA={setnewnewDATA}
            setNewDATA={setNewDATA}
            setcardselected={setcardselected}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={NewDATA}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
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
    justifyContent: "space-evenly",
    paddingTop: Constants.statusBarHeight,
  },
  section: {
    justifyContent: "center",

    width: "85%",
    height: hp(10),
    alignSelf: "center",
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
