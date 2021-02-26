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
          backgroundColor: "#f2f2f2",
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
          Hi! John,{"\n"}Have you arrived safely?
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "space-around",
          width: wp(90),
          backgroundColor: "#f2f2f2",
          alignSelf: "center",
        }}
      >
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
