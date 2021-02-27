import { React, Text, View, ClickedDriver, styles, wp } from "../api/constants";

const MyPersonalDriver = ({}) => {
  return (
    <View style={[styles.container, { flex: 0.6, padding: wp(3) }]}>
      <ClickedDriver
        clickedDriver={{
          item: {
            name: "Jacob",
            surname: "sfsf",
            cellphone: "09-09890",
            picture: "",
            registration: "15465 jhkjhkj",
            model: "5646465",
            status: "Online",
          },
        }}
      />
    </View>
  );
};

export default MyPersonalDriver;
