import {
  React,
  useState,
  View,
  Text,
  LoadingContent,
  useQuery,
  useMutation,
  DRIVERS_LIVELOCATION,
  ALERT_EMAIL,
  GetData,
  StackActions,
  styles,
  AreYouSureDriverArrivedModal,
  StandByForCallModal,
  HaveYouArrivedModal,
  DriverNotArrived,
  RatingModal,
  LiveTripDetails,
} from "../api/constants";

const TrackDriver = ({ navigation, LiveTripDetails }) => {
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(true);
  const [destinationArrived, setdestinationArrived] = React.useState(false);
  const [clickCount, setclickCount] = useState(null);
  const [sureModalVisible, setsureModalVisible] = React.useState(false);
  const [driverArrived, setDriverArrived] = React.useState(true);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [driverNotArrived, setdriverNotArrived] = React.useState(null);
  const [useruuid, setuseruuid] = React.useState(null);
  const [uuidTrip, setuuidTrip] = React.useState(null);
  const [driverRegistration, setDriverRegistration] = useState(null);
  const [timeRemaining, settimeRemaining] = React.useState(null);
  const [EmergencyAlert] = useMutation(ALERT_EMAIL);
  const { loading, error, data, stopPolling } = useQuery(DRIVERS_LIVELOCATION, {
    onCompleted: () => {
      if (
        data &&
        data.driversLocation[0] &&
        JSON.parse(data.driversLocation[0].driverremainingtime) !==
          timeRemaining
      ) {
        settimeRemaining(
          data &&
            data.driversLocation[0] &&
            JSON.parse(data.driversLocation[0].driverremainingtime)
        );
      }
    },
    variables: {
      uuidUser: useruuid,
      uuidTrip: uuidTrip,
    },
    pollInterval: 2800,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
    GetData("uuidTrip").then((value) => setuuidTrip(value));
  });
  if (
    data &&
    data.driversLocation &&
    data.driversLocation[0] &&
    data.driversLocation[0].driverremainingtime === null
  ) {
    return <LoadingContent />;
  }
  if (
    (data && data.driversLocation === undefined) ||
    (data && data.driversLocation[0] === undefined)
  )
    return <LoadingContent />;

  if (error) return <Text>Error</Text>;
  return (
    <View style={styles.container}>
      <LiveTripDetails
        data={data}
        driverArrived={driverArrived}
        loading={loading}
        setsureModalVisible={(val) => setsureModalVisible(val)}
        driverNotArrived={driverNotArrived}
        setdriverNotArrived={(val) => setdriverNotArrived(val)}
        setmodalVisible={(val) => setmodalVisible(val)}
        EmergencyAlert={EmergencyAlert}
        setdestinationArrived={(val) => setdestinationArrived(val)}
      />
      <DriverNotArrived
        driverArrived={driverArrived}
        data={data}
        uuidTrip={uuidTrip}
        useruuid={useruuid}
        loading={loading}
      />
      <HaveYouArrivedModal
        setsureModalVisible={setsureModalVisible}
        setRatingModalVIsibile={setRatingModalVIsibile}
        EmergencyAlert={EmergencyAlert}
        data={data}
        destinationArrived={destinationArrived}
        setdestinationArrived={setdestinationArrived}
      />

      <StandByForCallModal
        setmodalVisible={setmodalVisible}
        setDriverArrived={setDriverArrived}
        modalVisible={modalVisible}
      />
      <RatingModal
        RatingModalVIsibile={RatingModalVIsibile}
        onPress={() => {
          setRatingModalVIsibile(false),
            navigation.navigate("Payments"),
            navigation.dispatch(StackActions.replace("Ride"));
        }}
      />

      <AreYouSureDriverArrivedModal
        sureModalVisible={sureModalVisible}
        onPress={() => {
          setsureModalVisible(false), setDriverArrived(true);
        }}
        setsureModalVisible={() => setsureModalVisible(false)}
        setDriverArrived={() => setDriverArrived(false)}
      />
    </View>
  );
};

export default function ({ navigation }) {
  return (
    <TrackDriver navigation={navigation} LiveTripDetails={LiveTripDetails} />
  );
}
