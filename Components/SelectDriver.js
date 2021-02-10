import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../Context";
import { gql, useQuery } from "@apollo/client";
const windowWidth = Dimensions.get("window").width;
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
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          flexDirection: "row",
          width: wp(90),
          alignSelf: "center",
          height: hp(30),
          /*  borderWidth: wp(0.25), */
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setClickedDriver(props),
              context.dispatch({ type: "SAVE_DRIVERUUID", driveruuid: uuid });
          }}
          style={{
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row",
            width: wp(80),
            alignSelf: "center",
            height: hp(25),
          }}
        >
          <View style={styles.driverDetails}>
            <Text style={{ fontWeight: "bold" }}>Name</Text>
            <Text>
              {name} {surname}
            </Text>
            <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
              Cellphone
            </Text>
            <Text>{cellphone}</Text>
            <Text style={{ fontWeight: "bold" }}>Registration</Text>
            <Text>{registration}</Text>
            <Text style={{ fontWeight: "bold" }}>Model</Text>
            <Text>{model}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
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
      </View>
    );
  }
};

const ClickedDriver = (props) => {
  const { name, surname, cellphone, picture, registration, model, status } =
    props.clickedDriver && props.clickedDriver.item;
  {
    if (status !== "Online") return <></>;
    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignSelf: "center",
          height: hp(30),
          borderWidth: wp(0.25),
          padding: wp(2),
          borderRadius: wp(2),
          width: wp(90),
        }}
      >
        <View style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <Text>
            {name} {surname}
          </Text>
          <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
            Cellphone
          </Text>
          <Text>{cellphone}</Text>
          <Text style={{ fontWeight: "bold" }}>Registration</Text>
          <Text>{registration}</Text>
          <Text style={{ fontWeight: "bold" }}>Model</Text>
          <Text>{model}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
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
      </View>
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
        <View style={{ width: wp(100) }}>
          <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
          <Text style={{ alignSelf: "center" }}>Searching for drivers...</Text>
        </View>
      );
    return (
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        {DriverDetails.length !== 0 && DriverDetails.length !== 1 && (
          <Text style={{ alignSelf: "center" }}>Swipe for more</Text>
        )}
        {/*  <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ alignSelf: "center" }}>{"<--"}</Text>
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
          contentContainerStyle={{
            width: wp(90),
            flex: 1,
            alignSelf: "center",
          }}
        />
        {/* <TouchableOpacity
          onPress={() => {
            this.goIndex();
          }}
          style={{ alignSelf: "center" }}
        >
          <Text style={{ alignSelf: "center" }}>{"-->"}</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default function (props) {
  const { context } = props;
  const [clickedDriver, setClickedDriver] = React.useState(null);
  const AysncLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      return true;
    } catch (e) {
      return false;
    }
  };

  const linkTo = useLinkTo();
  const GET_DRIVERS = gql`
    query {
      allDriver {
        id
        uuid
        name
        surname
        status
        cellphone
        picture
        registration
        model
      }
    }
  `;
  const { error, data, stopPolling } = useQuery(GET_DRIVERS, {
    onCompleted: () => {
      context &&
        context.dispatch({
          type: "SAVE_TOTAL_DRIVERS_ONLINE",
          totalDriversOnline: data.allDriver.length,
        });
      if (context && context.state.driveruuid !== "") {
        stopPolling();
      }
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: 7000,
  });

  if (error) {
    console.log(error);
  }

  if (data && data.allDriver !== undefined)
    return (
      <ContextConsumer>
        {(context) => {
          return (
            <>
              {context.state.driveruuid === "" && (
                <AllDrivers
                  {...props}
                  setClickedDriver={setClickedDriver}
                  linkTo={linkTo}
                  context={context}
                  DriverDetails={data.allDriver}
                  /* flatListRef={flatListRef} */
                />
              )}
              {context.state.driveruuid !== "" && (
                <ClickedDriver
                  clickedDriver={clickedDriver !== null && clickedDriver}
                  {...props}
                  linkTo={linkTo}
                  context={context}
                />
              )}
            </>
          );
        }}
      </ContextConsumer>
    );
  return <></>;
}

const styles = StyleSheet.create({
  driverDetails: {
    justifyContent: "space-around",
    width: wp(50),
    flex: 1,
  },
});
