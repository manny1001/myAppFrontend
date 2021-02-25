import {
  React,
  View,
  Text,
  RFPercentage,
  hp,
  styles,
  Indicator,
} from "../api/constants";

const Loader = () => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "space-between",
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: "#723BF0",
        },
      ]}
    >
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Chauffeur</Text>
        <Text style={styles.HeaderSubText}>self-driven , customer service</Text>
      </View>
      <Indicator />
      {/* <Image
        style={styles.loadingGify}
        source={require("../../assets/gifys/4V0b.gif")}
      /> */}
    </View>
  );
};
export const LoadingContent = () => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
          backgroundColor: "#723BF0",
          marginBottom: 0,
        },
      ]}
    >
      {/* <ActivityIndicator color="#6c63ff" size="large" /> */}
      <Text
        style={{
          marginTop: hp(4),
          alignSelf: "center",
          fontFamily: "Gotham_Medium_Regular",
          fontSize: RFPercentage(3),
        }}
      >
        Please wait...
      </Text>
    </View>
  );
};
export default Loader;
