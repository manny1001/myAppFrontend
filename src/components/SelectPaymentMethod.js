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
    </>
  );
};

export default SelectedPaymentMethod;
