import {
  React,
  View,
  Text,
  Modal,
  wp,
  hp,
  RFPercentage,
  BigButton,
} from "../api/constants";

const HaveYouArrivedModal = ({
  setsureModalVisible,
  setRatingModalVIsibile,
  EmergencyAlert,
  data,
  destinationArrived,
  setdestinationArrived,
}) => {
  return (
    <Modal
      backgroundColor={"#f2f2f2"}
      isVisible={destinationArrived}
      onBackdropPress={() => setsureModalVisible(false)}
    >
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
          Have you arrived safely?
        </Text>
        <BigButton
          onPress={() => {
            setRatingModalVIsibile(true),
              setsureModalVisible(false),
              setdestinationArrived(false);
          }}
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
            setdestinationArrived(false);
            /*  EmergencyAlert({
              variables: {
                uuidTrip: data && data.driversLocation[0].uuidTrip,
                message: `${data && data.driversLocation[0].name} , ${
                  data && data.driversLocation[0].cellphone
                } , I did not arrive safely , please help , DriverName : ${
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

export default HaveYouArrivedModal;
