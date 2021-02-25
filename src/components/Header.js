import { React, Header, hp } from "../api/constants";

const TopHeader = ({
  Opacityvalue,
  backColor,
  LeftComponent,
  CenterComponent,
  RightComponent,
}) => {
  return (
    <>
      <Header
        backgroundColor={backColor ? backColor : "#f2f2f2"}
        containerStyle={{
          flexDirection: "row",
          zIndex: 100,
          height: hp(10),
        }}
        leftComponent={LeftComponent}
        centerComponent={CenterComponent}
        rightComponent={RightComponent}
      />
    </>
  );
};

export default TopHeader;
