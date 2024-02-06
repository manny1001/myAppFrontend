import {
  React,
  wp,
  BigButton,
  Icon,
  PAYMENT_CONFIRMATION,
  useMutation,
} from "../api/constants";
const PaymentButton = ({
  navigation,
  uuidTrip,
  setselectedCard,
  paymentMethod,
  totalAmount,
  selectedValue,
  context,
  stopPolling,
}) => {
  const [PayOrConfirm] = useMutation(PAYMENT_CONFIRMATION);
  console.log(
    "uuidTrip: ",
    uuidTrip,
    " totalAmount:",
    totalAmount,
    " paymentMethod: ",
    paymentMethod
  );
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
        }).then(() => {
          navigation.navigate("TrackDriver");
          console.log("done");
        });
      }}
    />
  );
};

export default PaymentButton;
