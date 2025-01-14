import { React, Text, ClickedDriver, AllDrivers } from "../api/constants";

export default function (props) {
  const { context, error, data, setClickedDriver, clickedDriver } = props;
  if (error) return <Text>{error.message}</Text>;
  if (data && data.allDriver !== undefined)
    return (
      <>
        {clickedDriver === null && (
          <AllDrivers
            {...props}
            setClickedDriver={setClickedDriver}
            context={context}
            DriverDetails={data && data.allDriver}
          />
        )}
        {clickedDriver && clickedDriver !== null && (
          <ClickedDriver
            clickedDriver={clickedDriver !== null && clickedDriver}
            {...props}
          />
        )}
      </>
    );
  return <></>;
}
