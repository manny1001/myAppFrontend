import {
  React,
  Text,
  TouchableOpacity,
  wp,
  hp,
  RFValue,
  View
} from "../api/constants";

const SelectedPaymentMethod = ({ onCardPress, onCashPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onCardPress}
        style={{
          position: "absolute",
          top: hp(50),
          left: wp(25),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Card
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCashPress}
        style={{
          position: "absolute",
          top: hp(50),
          right: wp(30),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Cash
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedPaymentMethod;
