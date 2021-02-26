import {
  React,
  View,
  Text,
  hp,
  wp,
  TouchableOpacity,
  RFPercentage,
} from "../api/constants";

const EmergencyButton = ({
  clickCount,
  setdestinationArrived,
  EmergencyAlert,
}) => {
  return (
    <View
      style={{
        width: wp(100),
        alignSelf: "center",
        justifyContent: "space-between",
        height: hp(10),
      }}
    >
      <Text
        style={{
          alignSelf: "center",
        }}
      >
        Enjoy your trip let us know if anything goes wrong
      </Text>

      <TouchableOpacity
        disabled={clickCount === 3 ? true : false}
        onPress={() => {
          setdestinationArrived(true);
          /* EmergencyAlert({
                  variables: {
                    uuidTrip: data && data.driversLocation[0].uuidTrip,
                    message: `${data && data.driversLocation[0].name} , ${
                      data && data.driversLocation[0].cellphone
                    } , Emergency!!! Somethng is wrong please help me , DriverName : ${
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
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: clickCount === 3 ? RFPercentage(4.5) : RFPercentage(3.5),
            flex: 1,
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
            borderWidth: clickCount === 3 ? null : wp(1),
            height: wp(9),
            borderRadius: wp(10),
            borderColor: "white",
            padding: wp(1),
          }}
        >
          {clickCount === 3 ? `Alert Sent!` : `Emergency Button`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyButton;
