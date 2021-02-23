import React from "react";
import { Text } from "react-native";
import ClickedDriver from "../components/ClickedDriver";
import { AllDrivers } from "../components/AllDrivers";

export default function (props) {
  const { context, error, data } = props;
  const [clickedDriver, setClickedDriver] = React.useState(null);

  if (error) return <Text>{error.message}</Text>;
  if (data && data.allDriver !== undefined)
    return (
      <>
        {context.state.driveruuid === "" && (
          <AllDrivers
            {...props}
            setClickedDriver={setClickedDriver}
            context={context}
            DriverDetails={data && data.allDriver}
          />
        )}
        {context.state.driveruuid !== "" && (
          <ClickedDriver
            clickedDriver={clickedDriver !== null && clickedDriver}
            {...props}
          />
        )}
      </>
    );
}
