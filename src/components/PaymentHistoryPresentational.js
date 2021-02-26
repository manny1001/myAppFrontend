import {
  React,
  styles,
  Modal,
  FlatList,
  View,
  Text,
  OrderReceipt,
  SendTipModal,
  Order,
  BigButton,
  hp,
} from "../api/constants";

const PaymentHistoryPresentational = ({
  visibleModal,
  orderObject,
  TipModalVisible,
  data,
  onBackdropPress,
  setvisibleModal,
  settTipModalVisible,
  setorderObject,
  navigation,
}) => {
  return (
    <>
      <Modal isVisible={visibleModal} onBackdropPress={() => onBackdropPress()}>
        <OrderReceipt
          onPress={() => setvisibleModal(false)}
          orderObject={orderObject.item}
        />
      </Modal>
      <SendTipModal
        TipModalVisible={TipModalVisible}
        settTipModalVisible={settTipModalVisible()}
      />

      <View style={[styles.container, {}]}>
        {data && data.getRequestHistory.length === 0 && (
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <Text
              style={{
                alignSelf: "center",
                marginTop: hp(35),
              }}
            >
              Seems like you havent request a trip yet...
            </Text>
            <BigButton
              title={"Find a chauffeur"}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
        {data && data.getRequestHistory.length !== 0 && (
          <FlatList
            data={data.getRequestHistory}
            renderItem={(item) => (
              <Order
                setvisibleModal={setvisibleModal}
                settTipModalVisible={settTipModalVisible}
                setorderObject={setorderObject}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
};

export default PaymentHistoryPresentational;
