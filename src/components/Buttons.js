import {
  React,
  wp,
  hp,
  Text,
  TouchableOpacity,
  RFPercentage,
  View,
} from "../api/constants";

const BigButton = ({
  background,
  titleStyle,
  activeOpacity,
  onPress,
  containerStyle,
  title,
  buttonStyle,
  disabled,
}) => (
  <View
    style={{
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    <TouchableOpacity
      disabled={disabled}
      containerStyle={[containerStyle, { justifyContent: "center" }]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={{
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 3, width: 3 }, // IOS
        shadowOpacity: 0.25, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: "#4c09b7",
        height: hp(7),
        justifyContent: "center",
        borderRadius: wp(20),
        flexDirection: "row",
        alignSelf: "stretch",
        width: "50%",
        display: "hidden",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          alignSelf: "center",
          color: "white",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default BigButton;
