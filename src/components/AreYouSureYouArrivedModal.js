//import liraries
import React, { lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
const BigButton = lazy(() => import("../components/Buttons"));
import Modal from "modal-enhanced-react-native-web";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AreYouSureYouArrivedModal = ({
  sureModalVisible,
  onPress,
  setsureModalVisible,
  setDriverArrived,
}) => {
  return (
    <Modal isVisible={sureModalVisible} onBackdropPress={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(5),
            alignSelf: "center",
            width: wp(75),
          }}
        >
          Are you sure your driver has arrived?
        </Text>
        <BigButton
          onPress={() => onPress()}
          title={"Yes"}
          titleStyle={{
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
          containerStyle={{
            top: hp(10),
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
        <BigButton
          onPress={() => {
            setsureModalVisible(), setDriverArrived();
            /* EmergencyAlert({
                variables: {
                  uuidTrip: data && data.driversLocation[0].uuidTrip,
                  message: `${data && data.driversLocation[0].name} , ${
                    data && data.driversLocation[0].cellphone
                  } , Driver has not yet arrived , second time I am contacting you , please assist... , DriverName : ${
                    data && data.driversLocation[0].drivername
                  } , DriverCellphone : ${
                    data && data.driversLocation[0].driversCellphone
                  } ,DriversImage : ${
                    data &&
                    data.driversLocation[0].data &&
                    data.driversLocation[0].driverImage
                  }, TripUUID : `,
                  status: data && data.driversLocation[0].status,
                },
              }); */
          }}
          title={"No"}
          titleStyle={{
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
          containerStyle={{
            top: hp(15),
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
      </View>
    </Modal>
  );
};
export default AreYouSureYouArrivedModal;
