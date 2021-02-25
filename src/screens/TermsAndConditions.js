import {
  React,
  Component,
  TouchableOpacity,
  Text,
  View,
  wp,
  BigButton,
  styles,
  AcceptTermsButton,
  AcceptTermsImage,
} from "../api/constants";

class AcceptTandCs extends Component {
  constructor(props) {
    super(props);
    this.state = { CellNumber: "", isAccepted: false };
  }
  render() {
    return (
      <View style={styles.container}>
        <AcceptTermsImage />
        <View style={styles.AcceptTandCs}>
          <AcceptTermsButton
            isAccepted={this.state.isAccepted}
            onPress={() => {
              this.setState({ isAccepted: !this.state.isAccepted });
            }}
          />
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text style={styles.heading5}>Accept Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <BigButton
          disabled={this.state.isAccepted === false ? true : false}
          activeOpacity={this.state.isAccepted === false ? 2 : 0.3}
          onPress={() => {
            this.props.navigation.navigate("PhoneAuth");
            this.props.context.dispatch({
              type: "AcceptedTCs",
            });
          }}
          title={"Continue"}
        />
      </View>
    );
  }
}

export default AcceptTandCs;
