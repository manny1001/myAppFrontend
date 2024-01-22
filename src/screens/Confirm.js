import {
  React,
  lazy,
  useState,
  NEW_REQUEST,
  GET_PROFILE,
  GET_DRIVERS,
  GetData,
  StoreData,
  LoadingContent,
  AddName,
  ConfrimPresentational,
  useMutation,
  useQuery,
  View,
  styles,
  Indicator,
  CURRENT_DRIVER,
  currentLocation,
  destination,
} from "../api/constants";

export default function (props) {
  console.log(props.currentLocation);
  console.log(props.destination);
  const [distance, setDistance] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(18000);
  const [urgency, setUrgency] = React.useState(null);
  const [currentLocation, setcurrentLocation] = React.useState(
    props.currentLocation
  );
  const [destination, setdestination] = React.useState(props.destination);
  const [userName, SetUserName] = useState("");
  const [personalDriver, setPersonalDriver] = React.useState(null);
  const [newTripRequest, { called }] = useMutation(NEW_REQUEST);
  const [driveruuid, setDriveruuid] = useState(null);

  const {
    data,
    loading: Loading,
    error: profileerrors,
  } = useQuery(GET_PROFILE, {
    fetchPolicy: "network",
    onCompleted: (profile) => {
      console.log("profile", profile);
      console.log("Loading", Loading);

      StoreData("userID", profile.currentUser._id);
      StoreData("useruuid", profile.currentUser.uuid);
      StoreData("name", profile.currentUser.name);
      SetUserName(profile.currentUser?.name);
    },
  });

  /* const {
    data: DATAS,
    loading,
    error: ERRORS,
  } = useQuery(CURRENT_DRIVER, {
    variables: { driveruuid: driveruuid },
  }); */
  const {
    error,
    data: DATA,
    stopPolling,
  } = useQuery(GET_DRIVERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    pollInterval: 200,
  });
  if (Loading) {
    return (
      <View style={styles.container}>
        <Indicator />
      </View>
    );
  }
  /* if (userName === null || userName.length === 0) return <AddName />; */
  return (
    <ConfrimPresentational
      {...props}
      data={data}
      newTripRequest={newTripRequest}
      stopPolling={() => stopPolling()}
      destination={destination}
      location={currentLocation}
      error={error}
      DATA={DATA}
      called={called}
      urgency={urgency}
      personalDriver={personalDriver}
      setPersonalDriver={(val) => setPersonalDriver(val)}
      driveruuid={driveruuid}
      loading={Loading}
      /* DATAS={DATAS} */
    />
  );
}
