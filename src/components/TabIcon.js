import { React, styles, MaterialIcons } from "../api/constants";

const TabIcon = ({ name, color, size }) => {
  return (
    <MaterialIcons
      name={name}
      size={26}
      color="black"
      style={styles.tabIconStyle}
    />
  );
};

export default TabIcon;
