import React from 'react';

import ModalWithBottomBtn from 'components/higher-order/modal-with-bottom-btn';
import TagsCloudInputComponent from 'components/higher-order/tags-cloud-input';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
};

const OthersModal = ({ isVisible, setIsVisible }: Props) => {
  return (
    <ModalWithBottomBtn
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      title="Other"
      onPress={() => console.log('clicked')}
    >
      <TagsCloudInputComponent question="Which other medical conditions do you have or have had?" />
      <TagsCloudInputComponent question="Please list all other medications that you are currently taking?" />
    </ModalWithBottomBtn>
  );
};

export default OthersModal;
