import {
  React,
  View,
  Text,
  BigButton,
  Modal,
  RFPercentage,
  wp,
  hp,
} from "../api/constants";
const AreYouSureDriverArrivedModal = ({
  sureModalVisible,
  onPress,
  setsureModalVisible,
  setDriverArrived,
}) => {
  return (
    <Modal
      style={{ backgroundColor: "#f2f2f2" }}
      isVisible={sureModalVisible}
      onBackdropPress={() => {}}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(5),
            alignSelf: "center",
            width: wp(70),
            backgroundColor: "#5C77F0",
            padding: wp(10),
          }}
        >
          Are you sure your driver has arrived?
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "space-around",
          width: wp(90),
          alignSelf: "center",
        }}
      >
        <BigButton
          onPress={() => onPress()}
          title={"Yes"}
          titleStyle={{
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
          containerStyle={{}}
          buttonStyle={{
            height: hp(10),
            width: wp(90),
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
          buttonStyle={{
            height: hp(10),
            width: wp(90),
          }}
        />
      </View>
    </Modal>
  );
};
export default AreYouSureDriverArrivedModal;
