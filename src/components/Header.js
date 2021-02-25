import { React, View, Text, hp, styles } from "../api/constants";

const TopHeader = ({
  Opacityvalue,
  backColor,
  LeftComponent,
  CenterComponent,
  RightComponent,
}) => {
  return (
    <View style={styles.Header}>
      <Text style={styles.HeaderText}>Chauffeur</Text>
      <Text style={styles.HeaderSubText}>self-driven , customer service</Text>
    </View>
  );
};

export default TopHeader;
