import React, { lazy } from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SelectedBankCard = lazy(() => import("../Components/SelectedBankCard"));
const TripDetails = lazy(() => import("../Components/TripDetails"));
const SelectedbankCardAndTripDetails = ({
  selectedValue,
  clientFirstName,
  clientLastName,
  clientCellNumber,
  location,
  timeRequested,
  setselectedCard,
}) => {
  return (
    <View
      style={{
        width: wp(90),
        alignSelf: "center",
        flex: 0.6,
      }}
    >
      {setselectedCard !== null && (
        <SelectedBankCard setselectedCard={setselectedCard} />
      )}

      <TripDetails
        selectedValue={selectedValue}
        clientFirstName={clientFirstName}
        clientLastName={clientLastName}
        clientCellNumber={clientCellNumber}
        location={location}
        timeRequested={timeRequested}
      />
    </View>
  );
};

export default SelectedbankCardAndTripDetails;
