import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import styles from "../styles/styles";
import { Avatar } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Drivers = (props) => {
  const { setClickedDriver, context } = props;
  const {
    uuid,
    name,
    surname,
    cellphone,
    picture,
    registration,
    model,
  } = props.item;
  {
    return (
      <TouchableOpacity
        onPress={() => {
          setClickedDriver(props),
            context.dispatch({ type: "SAVE_DRIVERUUID", driveruuid: uuid });
        }}
        style={{
          flexDirection: "row",
          flex: 1,
          alignSelf: "center",
          justifyContent: "space-between",
          width: wp(80),
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            height: hp(28),
          }}
        >
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", fontWeight: "bold" }}
          >
            Name
          </Text>
          <Text style={{ fontFamily: "Gotham_Medium_Regular" }}>
            {name} {surname}
          </Text>
          <Text
            style={{
              fontFamily: "Gotham_Medium_Regular",
              fontWeight: "bold",
            }}
          >
            Cellphone
          </Text>
          <Text style={{ fontFamily: "Gotham_Medium_Regular" }}>
            {cellphone}
          </Text>
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", fontWeight: "bold" }}
          >
            Registration
          </Text>
          <Text style={{ fontFamily: "Gotham_Medium_Regular" }}>
            {registration}
          </Text>
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", fontWeight: "bold" }}
          >
            Model
          </Text>
          <Text style={{ fontFamily: "Gotham_Medium_Regular" }}>{model}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <Avatar
            renderPlaceholderContent={picture && <ActivityIndicator />}
            rounded
            size="xlarge"
            containerStyle={{
              height: hp(15),
              width: hp(15),
              borderRadius: hp(7.5),
              alignSelf: "center",
            }}
            source={{ uri: picture }}
          />
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
          >
            7 mins away
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export class AllDrivers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: 1,
      DriversAvailable: [],
    };
  }
  goIndex = () => {
    this.flatList_Ref.scrollToIndex({ animated: true, index: 1 });
  };
  render() {
    const {
      DriverDetails,
      setClickedDriver,
      context,
      flatListRef,
    } = this.props;
    if (DriverDetails.length === 0)
      return (
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
          >
            Searching for drivers...
          </Text>
        </View>
      );
    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "column",
          alignSelf: "center",
          flex: 1,
          width: wp(80),
        }}
      >
        {DriverDetails.length !== 0 && DriverDetails.length !== 1 && (
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
          >
            Swipe for more
          </Text>
        )}
        {/*  <TouchableOpacity style={{ alignSelf: "center" }}>
             <Text style={{fontFamily: "Gotham_Medium_Regular",
 alignSelf: "center" }}>{"<--"}</Text>
          </TouchableOpacity> */}
        <FlatList
          /* ref={(ref) => {
              let flatListRef = React.useRef("");
              flatListRef = ref;
            }} */
          snapToAlignment={"start"}
          snapToInterval={windowWidth}
          decelerationRate={"fast"}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={DriverDetails}
          renderItem={({ item }) => {
            return (
              <Drivers
                item={item}
                setClickedDriver={setClickedDriver}
                context={context}
              />
            );
          }}
          keyExtractor={(item) => item.uuid}
        />
      </View>
    );
  }
}
