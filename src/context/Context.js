import { React, Component, AsyncStorage, StoreData } from "../api/constants";
const { Provider, Consumer } = React.createContext();

class Context extends Component {
  state = {
    sessionArray: {
      cellphone: "",
      name: "",
      email: "",
      destination: "",
      departureTime: "",
      destinationArrivalTime: "",
      selectedDriver: {},
      location: "",
      timeRequested: "",
      paymentMethod: "",
      tripFee: "",
      tip: "",
      firstTimeLogin: true,
      totalAmount: "",
      isloggedIn: false,
      userToken: null,
      AcceptedTCs: false,
      driveruuid: "",
      useruuid: "",
      activeRequest: null,
      driverArrived: false,
      isPlaying: false,
      totalDriversOnline: null,
      windowWidth: null,
      windowHeight: null,
      personalDriver: null,
    },
  };
  componentDidMount() {
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        console.log('userToken',userToken);
        /*         setIsplaying(isPlaying); */
        /* context.dispatch({
        type: "SAVE_ISPLAYING",
        isPlaying: JSON.parse(isPlaying),
      }); */

        this.dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
      } catch (e) {
        console.log(e);
      }
    };
    const StoreData = async (value) => {
      try {
        await AsyncStorage.setItem("accessToken", value);
      } catch (e) {
        // saving error
      }
    };

    /* StoreData(null); */
    RestoreAsync();
  }
  dispatch = (action) => {
    switch (action.type) {
      case "SAVE_PERSONAL_DRIVER":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              personalDriver: action.personalDriver,
            },
          }),
          () => StoreData("PersonalDriver", action.personalDriver)
        );
      case "WINDOW_WIDTH":
        console.log(action);
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            windowWidth: action.windowWidth,
          },
        }));
      case "SAVE_TOTAL_DRIVERS_ONLINE":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            totalDriversOnline: action.totalDriversOnline,
          },
        }));
      case "SAVE_ISPLAYING":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              isPlaying: action.isPlaying,
            },
          }),
          () => StoreData("isPlaying", action.isPlaying)
        );
      case "SAVE_DRIVERARRIVED":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              driverArrived: action.driverArrived,
            },
          }),
          () => StoreData("driverArrived", action.driverArrived)
        );

      case "SAVE_ACTIVEREQUEST":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              activeRequest: action.activeRequest,
            },
          }),
          () => StoreData("activeRequest", action.activeRequest)
        );
      case "SAVE_USERUUID":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              useruuid: action.useruuid,
            },
          }),
          () => StoreData("useruuid", action.useruuid)
        );
      case "SAVE_DRIVERUUID":
        console.log(action);
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            driveruuid: action.driveruuid,
          },
        }));
      case "SAVE_TOTALAMOUNT":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              totalAmount: action.totalAmount,
            },
          }),
          () => StoreData("totalAmount", action.totalAmount)
        );
      case "SAVE_DRIVER":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              selectedDriver: action.selectedDriver,
            },
          }),
          () => StoreData("selectedDriver", action.selectedDriver)
        );
      case "AcceptedTCs":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            AcceptedTCs: true,
          },
        }));
      case "SET_FIRST_TIME":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            firstTimeLogin: false,
          },
        }));
      case "SAVE_EMAIL":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            email: action.payload,
          },
        }));

      case "SAVE_CELL":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              cellphone: action.cellphone,
            },
          }),
          () => StoreData("cellphone", action.cellphone)
        );
      case "SAVE_PICKUPLOCATION":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              location: action.location,
            },
          }),
          () => StoreData("location", action.location)
        );
      case "SAVE_DESTINATION":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              destination: action.destination,
            },
          }),
          () => StoreData("destination", action.destination)
        );
      case "SIGN_IN":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              isloggedIn: true,
              userToken: action.userToken,
            },
          }),
          () => StoreData("accessToken", action.userToken)
        );
      case "SIGN_OUT":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            isloggedIn: false,
            userToken: null,
          },
        }));
      case "RESTORE_TOKEN":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            isloggedIn: true,
            userToken: action.userToken,
          },
        }));
      case "ADD_TO_CART":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            timeRequested: new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, ""),
            paymentMethod: action.payload.paymentMethod,
            /*  cardName: action.payload.cardName,
            cardNumber: action.payload.cardNumber,
            cardDate: action.payload.cardDate, */
            tripFee: action.payload.tripFee,
            tip: action.payload.tip,
            totalAmount: action.payload.totalAmount,
          },
        }));
      default:
        return this.state;
    }
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state.sessionArray,
          dispatch: this.dispatch,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export { Context, Consumer as ContextConsumer };
