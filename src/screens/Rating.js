import {
  React,
  useState,
  Text,
  View,
  AirbnbRating,
  Button,
  wp,
  hp,
  styles,
  RFPercentage,
} from "../api/constants";

export default function RatingScreen(props) {
  const [visibleModal, setvisibleModal] = useState(false);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#f2f2f2", justifyContent: "center", flex: 0.6 },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {visibleModal === false ? (
          <Text
            style={{
              fontSize: RFPercentage(5),
              alignSelf: "center",
              width: wp(70),
              backgroundColor: "#5C77F0",
              padding: wp(10),
            }}
          >
            Please rate our service?
          </Text>
        ) : (
          <>
            <Text
              style={{
                alignSelf: "center",
                width: wp(70),
                backgroundColor: "#5C77F0",
                padding: wp(10),
              }}
            >
              Thanks for your feedback...
            </Text>
          </>
        )}
        <AirbnbRating
          style={{ flex: 1 }}
          defaultRating={2}
          count={3}
          reviews={["Terrible", "Good", "Great"]}
          onFinishRating={() => setvisibleModal(true)}
          size={50}
        />
        {visibleModal === true && (
          <Button
            onPress={() => props.onPress()}
            title="Finished"
            type="outline"
            buttonStyle={{ width: wp(50), alignSelf: "center" }}
          />
        )}
      </View>
    </View>
  );
}
