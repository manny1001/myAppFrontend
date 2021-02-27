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
} from "../api/constants";

export default function (props) {
  const [distance, setDistance] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(18000);
  const [urgency, setUrgency] = React.useState(null);
  const [location, setlocation] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [userName, setUserName] = useState("");
  const [newTripRequest, { called }] = useMutation(NEW_REQUEST);
  const { data, loading: Loading } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      StoreData("userID", data.currentUser._id);
      StoreData("useruuid", data.currentUser.uuid),
        StoreData("name", data.currentUser.name),
        setUserName(data.currentUser.name);
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { error, data: DATA, stopPolling } = useQuery(GET_DRIVERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    pollInterval: 200,
  });
  React.useEffect(() => {
    GetData("location").then((location) => setlocation(location));
    GetData("destination").then((destination) => setdestination(destination));
    GetData("Urgency").then((urgency) => setUrgency(urgency));
  });
  if (Loading) {
    return (
      <View style={styles.container}>
        <Indicator />
      </View>
    );
  }
  if (userName === null || userName.length === 0) return <AddName />;
  return (
    <ConfrimPresentational
      {...props}
      data={data}
      newTripRequest={newTripRequest}
      stopPolling={() => stopPolling()}
      destination={destination}
      location={location}
      error={error}
      DATA={DATA}
      called={called}
      urgency={urgency}
    />
  );
}
