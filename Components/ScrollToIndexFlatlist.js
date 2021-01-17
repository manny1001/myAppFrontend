import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useLinkTo } from "@react-navigation/native";
import BigButton from "../Components/Buttons.js";
import { SlideData, DriverDetails } from "../DATA";
import { ContextConsumer } from "../Context";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export class Driver extends React.Component {
  constructor(props) {
    super(props);
    const items = [];

    this.state = {
      currentTab: 1,
      refreshing: false,
      items: items,
      isPressed: 1,
    };
  }

  Driver = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          width: wp(100),
          alignSelf: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: wp(20),
            height: wp(20),
            borderRadius: wp(10),
            resizeMode: "contain",
          }}
        />
        <View style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <Text>John Keneddy</Text>
        </View>
        <TouchableOpacity style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Cellphone</Text>
          <View style={{ flexDirection: "row" }}>
            {/* <MaterialIcons
              name="call"
              size={wp(4)}
              color="black"
              style={{
                alignSelf: "center",
                marginRight: wp(3),
              }}
            /> */}
            <Text>078 598 6325</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Registration</Text>
          <Text>CX 01 BC GP</Text>
        </View>
        <View style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Vehicle Type</Text>
          <Text>Hyundai i20</Text>
        </View>
      </View>
    );
  };

  render() {
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
        renderItem={this.Driver}
        keyExtractor={(item) => {
          item.id;
        }}
        contentContainerStyle={{
          width: windowWidth,
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

  return (
    <ContextConsumer>
      {(context) => {
        return <Driver {...props} linkTo={linkTo} context={context} />;
      }}
    </ContextConsumer>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: RFValue(12),
    width: wp(90),
  },
  heading2: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    textAlign: "flex-start",
  },
  driverDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(80),
    alignSelf: "center",
  },
  heading3: {
    fontSize: RFValue(16),
    fontWeight: "bold",

    alignSelf: "flex-start",
    textAlign: "flex-start",
  },
  block: {
    width: wp(40),
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  locations: {
    fontSize: RFValue(15),
    fontWeight: "400",
    textAlign: "flex-start",
    width: wp(80),
  },
  locationsBlock: {
    bottom: hp(3),
    marginLeft: wp(1),
    width: wp(80),
  },
});
