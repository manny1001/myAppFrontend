import {
  React,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  wp,
  hp,
  RFPercentage,
  Avatar,
  windowWidth,
} from "../api/constants";

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
          setClickedDriver(props);
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
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <Text>
            {name} {surname}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Cellphone
          </Text>
          <Text>{cellphone}</Text>
          <Text style={{ fontWeight: "bold" }}>Registration</Text>
          <Text>{registration}</Text>
          <Text style={{ fontWeight: "bold" }}>Model</Text>
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
          <Text style={{ alignSelf: "center" }}>7 mins away</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

class AllDrivers extends React.Component {
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
          overflow: "hidden",
        }}
      >
        {DriverDetails.length !== 0 && DriverDetails.length !== 1 && (
          <Text
            style={{
              alignSelf: "center",
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
export default AllDrivers;
