import React from 'react';

import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';

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
      <TagsCloudInput question="Which other medical conditions do you have or have had?" />
      <TagsCloudInput question="Please list all other medications that you are currently taking?" />
    </ModalWithBottomBtn>
  );
};

export default OthersModal;
