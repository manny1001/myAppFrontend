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
import { RFPercentage } from "react-native-responsive-fontsize";
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
          <Text>
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
          <Text>{cellphone}</Text>
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", fontWeight: "bold" }}
          >
            Registration
          </Text>
          <Text>{registration}</Text>
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", fontWeight: "bold" }}
          >
            Model
          </Text>
          <Text>{model}</Text>
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
  render() {
    const { DriverDetails, setClickedDriver, context } = this.props;
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
          flex: 0.5,
          width: wp(80),
        }}
      >
        {DriverDetails.length !== 0 && DriverDetails.length !== 1 && (
          <Text
            style={{
              fontFamily: "Gotham_Medium_Regular",
              alignSelf: "center",
              fontSize: RFPercentage(2),
            }}
          >
            Swipe for more
          </Text>
        )}

        <FlatList
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
