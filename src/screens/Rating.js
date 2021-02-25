import {
  React,
  useState,
  Text,
  View,
  StyleSheet,
  AirbnbRating,
  Button,
  wp,
  hp,
} from "../api/constants";

export default function RatingScreen(props) {
  const [visibleModal, setvisibleModal] = useState(false);
  return (
    <View style={styles.container}>
      <>
        {/*    {type === "Ryde" && (
          <Text style={styles.paragraph}>
            Rate our delivery from Nandos {"\n"}15:00 on 12/12/2020
          </Text>
        )} */}

        <View style={{ height: hp(20), width: wp(70), alignSelf: "center" }}>
          <AirbnbRating
            defaultRating={2}
            count={3}
            reviews={["Terrible", "Good", "Great"]}
            onFinishRating={() => setvisibleModal(true)}
            size={50}
          />
        </View>
      </>

      {visibleModal === true && (
        <>
          <Text style={styles.paragraph}>Thanks for yor feedback</Text>

          <Button
            onPress={() => props.onPress()}
            title="Finished"
            type="outline"
            buttonStyle={{ width: wp(50), alignSelf: "center" }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
