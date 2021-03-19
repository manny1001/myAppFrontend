import { React, wp, BigButton, Icon } from "../api/constants";

const PaymentButton = ({
  navigation,
  uuidTrip,
  PayOrConfirm,
  setselectedCard,
  paymentMethod,
  totalAmount,
  selectedValue,
  context,
  stopPolling,
}) => {
  return (
    <BigButton
      icon={<Icon name="Safety" size={24} color="black" />}
      disabled={!setselectedCard && selectedValue === "Card" ? true : false}
      buttonStyle={{
        width: wp(80),
        alignSelf: "center",
      }}
      titleStyle={{ fontWeight: "bold" }}
      title={
        paymentMethod === "Cash"
          ? "Confirm" + " " + "\n" + "R" + " " + totalAmount
          : "Pay" + " " + "\n" + "R" + " " + totalAmount
      }
      onPress={() => {
        PayOrConfirm({
          variables: {
            uuidTrip: uuidTrip,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
          },
        }),
          stopPolling(),
          navigation.navigate("TrackDriver");
      }}
    />
  );
};

export default PaymentButton;
