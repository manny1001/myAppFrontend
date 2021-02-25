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
        <Text
          style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
        >
          Please add a Username.
        </Text>
        <TextInput
          style={{
            backgroundColor: "#f3f3f3",
            alignSelf: "center",
            width: wp(80),
            height: hp(7),
            fontSize: RFPercentage(2),
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

export default AddNames;
