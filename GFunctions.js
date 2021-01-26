import AsyncStorage from "@react-native-async-storage/async-storage";
const StoreData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
const GetData = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //you have your data in value variable
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};
export { StoreData, GetData };
