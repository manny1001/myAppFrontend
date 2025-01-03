import {
  View,
  Text,
  React,
  Modal,
  InputField,
  useMutation,
  USER_LOGIN,
  StoreData,
  styles,
  Loader,
  BigButton,
  PhoneAuthImage,
} from "../api/constants";

const PhoneAuth = ({ context }) => {
  /* function smsOtp(cellphone, otp) {
    let number = "27" + cellphone.slice(1, 10);
    console.log(number);
    var fetchUrl = `
  https://platform.clickatell.com/messages/http/send?apiKey=N4Yb09zfSzip6P1hS86zaQ==&to=${number}&content=Please enter this OTP to verify your cellphone number. ${otp}`;
    fetch(fetchUrl)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad request response from server");
        }
        return response.json();
      })
      .then(function (json) {
        console.log(json);
      });
  } */
  const [cellphone, setcellphone] = React.useState("0682621503");
  const [login, { loading, error, called }] = useMutation(USER_LOGIN);
  const [visibleModal, setvisibleModal] = React.useState(false);
  if (loading) return <Loader />;
  if (error) return <Text>{error.message}</Text>;
  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={visibleModal}></Modal>
      <PhoneAuthImage />
      <InputField
        maxLength={10}
        style={styles.cellphoneTextInput}
        keyboardType={"number-pad"}
        label="eg. 012 345 6789"
        text={cellphone}
        onChangeText={(text) => setcellphone(text)}
        value={cellphone}
      />

      <BigButton
        disabled={cellphone.length !== 10 || called === true ? true : false}
        onPress={() => {
          debugger;
          StoreData("cellphone", cellphone),
            login({ variables: { cellphone, type: "user" } })
              .then(({ data }) => {
                console.log(data);
                context.dispatch({
                  type: "SIGN_IN",
                  userToken: data.login.token,
                });
              })
              .catch((e) => {
                console.log(e);
                //Error Handler
              });
        }}
        title={"Sign In"}
        titleStyle={{ fontSize: 50 }}
      />
    </View>
  );
};
export default PhoneAuth;
