import { React, Modal, RatingScreen } from "../api/constants";

const RatingModal = ({ onPress, RatingModalVIsibile }) => {
  return (
    <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
      <RatingScreen onPress={onPress} />
    </Modal>
  );
};

export default RatingModal;
