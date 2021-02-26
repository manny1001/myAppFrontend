import {
  React,
  View,
  Text,
  StoreData,
  useQuery,
  GET_REQUEST_HISTORY,
  GET_USER_UUID,
  LoadingContent,
  PaymentHistoryPresentational,
  useState,
  Indicator,
  styles,
} from "../api/constants";

const Payments = (props) => {
  const [currentUserUUID, setcurrentUserUUID] = useState("");
  const { data: DATA, loading: LOADING } = useQuery(GET_USER_UUID, {
    onCompleted: () => {
      setcurrentUserUUID(DATA.currentUser.uuid),
        StoreData("useruuid", DATA.currentUser.uuid);
    },
  });
  const { data, loading, error } = useQuery(GET_REQUEST_HISTORY, {
    variables: { uuidUser: currentUserUUID },
  });
  const [visibleModal, setvisibleModal] = useState(false);
  const [orderObject, setorderObject] = useState({});
  const [TipModalVisible, settTipModalVisible] = useState();
  if (loading)
    return (
      <View style={styles.container}>
        <Indicator />
      </View>
    );
  if (data)
    return (
      <PaymentHistoryPresentational
        {...props}
        visibleModal={visibleModal}
        orderObject={orderObject}
        TipModalVisible={TipModalVisible}
        data={data}
        onBackdropPress={() => setvisibleModal(false)}
        setvisibleModal={(val) => setvisibleModal(val)}
        settTipModalVisible={() => settTipModalVisible(false)}
        setorderObject={(val) => setorderObject(val)}
      />
    );
  else return <Text>Unknown Error</Text>;
};

export default Payments;
