import {
  React,
  Text,
  View,
  ClickedDriver,
  styles,
  wp,
  useQuery,
  CURRENT_DRIVER,
  GetData,
  LoadingContent,
  DATAS,
} from "../api/constants";

const MyPersonalDriver = ({ loading, DATAS: data }) => {
  if (loading) return <LoadingContent />;
  console.log(data.driver.name);
  return (
    <View style={[styles.container, { flex: 0.6, padding: wp(3) }]}>
      <ClickedDriver
        clickedDriver={{
          item: {
            name: "jkhjkhkj",
            surname: "yuuuyuiu",
            cellphone: "8797987",
            picture: "yuiiiuoiu",
            registration: "090",
            model: "78979798",
            status: "oijojji8779798",
          },
        }}
      />
    </View>
  );
};

export default MyPersonalDriver;
/*  item: {
            name: data && data.driver && data.driver.name,
            surname: data && data.driver && data.driver.surname,
            cellphone: data && data.driver && data.driver.cellphone,
            picture: data && data.driver && data.driver.picture,
            registration: data && data.driver && data.driver.registration,
            model: data && data.driver && data.driver.model,
            status: data && data.driver && data.driver.status,
          }, */
