import { React, AsyncStorage, SettingsPresentational } from "../api/constants";

const AysncLogout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    return true;
  } catch (e) {
    return false;
  }
};
const Usersettings = (props) => {
  const DATA = [
    {
      id: "2",
      icon: <></>, //iconStyle
      title: "Feedback",
    },
    {
      id: "3",
      icon: <></>, //iconStyle
      title: "About",
    },
  ];
  return (
    <SettingsPresentational
      props={props}
      DATA={DATA}
      AysncLogout={() => AysncLogout()}
    />
  );
};

export default Usersettings;
