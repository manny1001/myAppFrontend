import {
  React,
  Text,
  TouchableOpacity,
  wp,
  hp,
  RFValue,
} from "../api/constants";

const SelectedPaymentMethod = ({ onCardPress, onCashPress }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onCardPress}
        style={{
          position: "absolute",
          zIndex: 100,
          top: hp(52),
          left: wp(25),
        }}
      >
        <Text
          style={{
            fontSize: RFValue(18),
            fontWeight: "500",
          }}
        >
          Card
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCashPress}
        style={{
          position: "absolute",
          zIndex: 100,
          top: hp(52),
          right: wp(30),
        }}
      >
        <Text
          style={{
            fontSize: RFValue(18),
            fontWeight: "500",
          }}
        >
          Cash
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SelectedPaymentMethod;
