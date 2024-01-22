import {
  React,
  Text,
  View,
  wp,
  hp,
  TextInput,
  GetData,
  BigButton,
  RFPercentage,
  useMutation,
  GET_PROFILE,
  UPDATE_USERNAME,
  StyleSheet,
} from "../api/constants";

const AddNames = (props) => {
  const [useruuid, setuseruuid] = React.useState("");
  const [name, setusername] = React.useState(null);
  const [updateProfile] = useMutation(UPDATE_USERNAME, {
    refetchQueries: [{ query: GET_PROFILE }],
  });
  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        <View style={styles.textStyle}>
          <label style={styles.textStyle}>Please add a Username.</label>
        </View>
        <TextInput
          style={{
            backgroundColor: "#f3f3f3",
            alignSelf: "center",
            width: wp(80),
            height: hp(7),
            fontSize: RFPercentage(2),
            borderColor: "#000000",
            borderWidth: "2px",
          }}
          keyboardType={"default"}
          label={"Username"}
          text={name}
          onChangeText={(text) => {
            {
              text === "" && setusername(null);
            }

            {
              text !== "" && setusername(text);
            }
          }}
        />
      </View>
      <BigButton
        onPress={() =>
          updateProfile({
            variables: {
              uuidUser: useruuid && useruuid,
              name: name && name,
            },
          })
        }
        disabled={name === null ? true : false}
        title={"Save"}
      />
    </>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: "#000",
    alignSelf: "center",
  },
});
export default AddNames;
