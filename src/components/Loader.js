import { React, View, Text, RFPercentage, hp, styles } from "../api/constants";

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
        },
      ]}
    >
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Chauffeur</Text>
        <Text style={styles.HeaderSubText}>self-driven , customer service</Text>
      </View>
      {/* <ActivityIndicator color="#6c63ff" size="large" /> */}
      {/* <Image
        style={styles.loadingGify}
        source={require("../../assets/gifys/4V0b.gif")}
      /> */}

      <Text
        style={{
          alignSelf: "center",
          fontSize: RFPercentage(3),
          marginBottom: hp(65),
        }}
      >
        App loading...
      </Text>
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
        Awaiting Response...
      </Text>
    </View>
  );
};
export default Loader;
