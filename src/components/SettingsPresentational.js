import {
  React,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  hp,
  RFPercentage,
  styles,
  BigButton,
  ContextConsumer,
} from "../api/constants";

const SettingsPresentational = ({ props, DATA, AysncLogout }) => {
  return (
    <View style={styles.container}>
      <FlatList
        containerStyle={{
          flex: 1,
          alignSelf: "center",
        }}
        style={{ marginTop: hp(5) }}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              item.id === "2" && props.navigation.navigate("Feedback");
              item.id === "3" && props.navigation.navigate("About");
            }}
            style={{
              borderBottomWidth: 0.1,
              borderBottomColor: "#d3d3d3",
              flexDirection: "row",
              flex: 1,
              height: hp(8),
              padding: 20,
            }}
          >
            {item.icon}
            <Text
              style={{
                fontFamily: "Gotham_Medium_Regular",
                fontSize: RFPercentage(3),
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              title={"Sign out"}
              onPress={() => {
                {
                  AysncLogout(), context.dispatch({ type: "SIGN_OUT" });
                }
              }}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};

export default SettingsPresentational;
