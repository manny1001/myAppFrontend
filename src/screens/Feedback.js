import {
  React,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  styles,
  useState,
} from "../api/constants";

const Feedback = (props) => {
  const [feedback, setfeedBack] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        containerStyle={{ flex: 1 }}
        style={{
          flex: 1,

          alignSelf: "stretch",
          borderColor: "gray",
          placeholderTextColor: "gray",
        }}
        value={feedback}
        onChangeText={(value) => setfeedBack(value)}
        multiline={true}
        numberOfLines={10}
        underlineColorAndroid="transparent"
        placeholder={
          "Have feedback,questions or have found a bug? We'd love to hear it..."
        }
      />

      <View
        style={{
          flex: 0.25,
          alignSelf: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ flexDirection: "column", alignSelf: "center" }}
        >
          <Text
            style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        {feedback !== "" && (
          <TouchableOpacity
            style={{ flexDirection: "column", alignSelf: "center" }}
          >
            <Text
              style={{
                fontFamily: "Gotham_Medium_Regular",
                alignSelf: "center",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Feedback;
