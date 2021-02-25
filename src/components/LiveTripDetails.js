import {
  React,
  View,
  wp,
  DriversInfo,
  CallDriver,
  ProfilePicture,
  CountdownTillDriverArrives,
} from "../api/constants";

const LiveTripDetails = ({
  data,
  driverArrived,
  loading,
  EmergencyAlert,
  clickCount,
  setdestinationArrived,
}) => {
  return (
    <View
      style={{
        width: wp(100),
        flex: 0.9,
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: wp(5),
      }}
    >
      <ProfilePicture
        source={{
          uri:
            data &&
            data.driversLocation &&
            data.driversLocation[0] &&
            data.driversLocation[0].driverImage,
        }}
        style={{
          width: wp(28),
          height: wp(28),
          alignSelf: "center",
          borderRadius: wp(14),
          borderWidth: wp(1.5),
          borderColor: "#6c63ff",
        }}
      />
      {driverArrived === false && <CallDriver />}

      <DriversInfo
        DriverName={
          data && data.driversLocation && data.driversLocation[0].drivername
        }
        DriverCarModel={
          data && data.driversLocation && data.driversLocation[0].model
        }
        DriverRegistration={
          data &&
          data.driversLocation &&
          data.driversLocation[0].driverregistration
        }
      />
      {driverArrived === true && (
        <EmergencyButton
          clickCount={clickCount}
          setdestinationArrived={setdestinationArrived}
          EmergencyAlert={EmergencyAlert}
        />
      )}

      {driverArrived === false && (
        <CountdownTillDriverArrives data={data} loading={loading} />
      )}
    </View>
  );
};

export default LiveTripDetails;
