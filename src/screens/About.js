import {
  React,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  styles,
  RFPercentage,
  hp,
} from "../api/constants";

const About = (props) => {
  const DATA = [
    {
      id: "1",
      title: "Application Version",
      description: "ShopForIt 4.4.4",
    },
    {
      id: "2",
      description: "Copyright 2020 Predict IT. All Rights Reserved",
      title: "Legal Information",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              padding: 20,
              marginVertical: hp(1),

              borderBottomWidth: 0.1,
              borderBottomColor: "#d3d3d3",
              height: hp(8),

              flexDirection: "row",
            }}
          >
            {item.icon}
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "Gotham_Medium_Regular",
                  fontSize: RFPercentage(3),
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: "Gotham_Medium_Regular",
                  fontSize: RFPercentage(1.5),
                  marginTop: hp(1),
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
  );
};

export default About;
