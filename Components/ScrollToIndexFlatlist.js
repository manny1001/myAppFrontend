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
import { RFValue } from "react-native-responsive-fontsize";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../Context";
import { gql, useQuery } from "@apollo/client";
const windowWidth = Dimensions.get("window").width;
const Drivers = (props) => {
  const { name, surname, cellphone, picture, registration, model } = props;
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        width: wp(100),
        alignSelf: "center",
        height: hp(30),
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
};

export class Driver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: 1,
    };
  }

  render() {
    const { DriverDetails } = this.props;
    return (
      <FlatList
        ref={(ref) => {
          this.flatListRef = ref;
        }}
        snapToAlignment={"start"}
        snapToInterval={windowWidth}
        decelerationRate={"fast"}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={DriverDetails}
        renderItem={({ item }) => <Drivers {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          width: wp(100),
          flex: 1,
          alignSelf: "center",
        }}
      />
    );
  }
}
/* {
  this.state.isPressed < 3 && (
    <>
      <BigButton
        onPress={() => {
          this.setState({ isPressed: this.state.isPressed + 1 });
          this.flatListRef.scrollToIndex({
            animated: true,
            index: this.state.isPressed,
          });
        }}
        containerStyle={{
          height: hp(15),
          justifyContent: "center",
        }}
        title={"Next"}
        buttonStyle={{
          height: hp(10),
          width: wp(80),
          alignSelf: "center",
          backgroundColor: "#6c63ff",
        }}
      />
    </>
  );
}
{
  this.state.isPressed == 3 && (
    <BigButton
      onPress={() => {
        this.props.navigation.navigate("AcceptTandCs");
      }}
      containerStyle={{
        height: hp(15),
        justifyContent: "center",
      }}
      title={"Start"}
      buttonStyle={{
        height: hp(10),
        width: wp(80),
        alignSelf: "center",
        backgroundColor: "#6c63ff",
      }}
    />
  );
} */
export default function (props) {
  const linkTo = useLinkTo();
  const GET_DRIVERS = gql`
    query {
      allDriver {
        id
        name
        surname
        cellphone
        picture
        registration
        model
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_DRIVERS, {
    fetchPolicy: "network-only",
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!loading && !error && data && data.allDriver !== undefined)
    return (
      <ContextConsumer>
        {(context) => {
          return (
            <Driver
              {...props}
              linkTo={linkTo}
              context={context}
              DriverDetails={data.allDriver}
            />
          );
        }}
      </ContextConsumer>
    );
}

const styles = StyleSheet.create({
  driverDetails: {
    justifyContent: "space-around",
    width: wp(50),
    flex: 1,
  },
});
