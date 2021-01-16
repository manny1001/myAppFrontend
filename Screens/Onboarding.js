import React from "react";
import { Text, View, FlatList, Dimensions, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useLinkTo } from "@react-navigation/native";
import BigButton from "../Components/Buttons.js";
import { SlideData } from "../DATA";
import { ContextConsumer } from "../Context";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
class IntroSlider extends React.Component {
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

  Slide = ({ item, index }) => {
    return (
      <View
        style={{
          height: hp(100),
          width: wp(100),
          justifyContent: "center",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            top: hp(5),
            position: "absolute",
            alignSelf: "center",
            color: "#6c63ff",
            fontSize: RFValue(22),
            fontWeight: "bold",
            zIndex: 100,
          }}
        >
          {item.description}
        </Text>
        <Image
          source={item.image}
          style={{
            height: hp(90),
            width: wp(100),
            alignSelf: "center",
            position: "absolute",
            top: 0,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  render() {
    console.log(this.props);
    const Dots = () => {
      return (
        <>
          {/* <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 1 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          />
          <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 2 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          />
          <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 3 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          /> */}
        </>
      );
    };
    return (
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <>
          <FlatList
            scrollEnabled={false}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
            snapToAlignment={"start"}
            snapToInterval={windowWidth}
            decelerationRate={"fast"}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={SlideData}
            renderItem={this.Slide}
            keyExtractor={(item) => {
              item.id;
            }}
            style={{ height: windowHeight - hp(20) }}
          />
        </>
        <View
          style={{
            width: wp(30),
            height: hp(10),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Dots />
        </View>
        {this.state.isPressed < 3 && (
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
        )}
        {this.state.isPressed == 3 && (
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
        )}
      </View>
    );
  }
}

export default function (props) {
  const linkTo = useLinkTo();

  return (
    <ContextConsumer>
      {(context) => {
        return <IntroSlider {...props} linkTo={linkTo} context={context} />;
      }}
    </ContextConsumer>
  );
}
