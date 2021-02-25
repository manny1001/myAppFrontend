import { React, ActivityIndicator, Image } from "../api/constants";

const ProfilePicture = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={style}
      PlaceholderContent={<ActivityIndicator />}
    />
  );
};

export default ProfilePicture;
