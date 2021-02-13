import React, { lazy, useState, useRef } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { SlideData } from "../DATA";
const BigButton = lazy(() => import("../Components/Buttons"));
const OnboardingSlide = lazy(() => import("../Components/OnboardingSlide"));
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const IntroSlider = (props) => {
  var flatListRef = useRef("");
  const [isPressed, setisPressed] = useState(1);
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <FlatList
        scrollEnabled={false}
        ref={(ref) => {
          flatListRef = ref;
        }}
        snapToAlignment={"start"}
        snapToInterval={windowWidth}
        decelerationRate={"fast"}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={SlideData}
        renderItem={(item) => <OnboardingSlide {...item} />}
        keyExtractor={(item) => {
          item.id;
        }}
        style={{ flex: 1 }}
      />

      {isPressed < 3 && (
        <>
          <BigButton
            onPress={() => {
              setisPressed(isPressed + 1);
              flatListRef.scrollToIndex({
                animated: true,
                index: isPressed,
              });
            }}
            title={"Next"}
          />
        </>
      )}
      {isPressed == 3 && (
        <BigButton
          onPress={() => {
            props.navigation.navigate("AcceptTandCs");
          }}
          title={"Start"}
        />
      )}
    </View>
  );
};

export default IntroSlider;
