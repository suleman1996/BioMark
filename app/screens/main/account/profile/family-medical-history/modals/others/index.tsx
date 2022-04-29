import React from 'react';

import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import TagsCloudInputComponent from 'components/higher-order/tags-cloud-input';

type Props = {
  isVisible: boolean;
};

const OthersModal = ({ isVisible }: Props) => {
  return (
    <ModalWithBottomBtn
      isVisible={isVisible}
      title="Other"
      onPress={() => console.log('clicked')}
    >
      <TagsCloudInputComponent question="Which other medical conditions do you have or have had?" />
    </ModalWithBottomBtn>
  );
};
export default OthersModal;
