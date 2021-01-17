import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const FlatListSettings = (props, onPress1) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: wp(100),
          alignSelf: "center",
        }}
      >
        <FlatList
          style={{
            flex: 1,
            height: hp(50),
            alignSelf: "center",
          }}
          data={props.DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                item.id === "1" && props.onPress1();
                item.id === "2" && props.onPress2();
                item.id === "3" && props.onPress3();
              }}
              style={{
                padding: 20,
                marginVertical: hp(1),
                width: wp(100),
                borderBottomWidth: 0.1,
                borderBottomColor: "#d3d3d3",
                height: hp(8),
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              {item.icon}
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text
                  style={{
                    fontSize: RFValue(18),

                    fontWeight: "400",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(12),

                    fontWeight: "300",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
});

export default FlatListSettings;
