import React from 'react';

import { ModalWithBottomBtn, TagsCloudInput } from 'components/higher-order';

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
      <TagsCloudInput question="Which other medical conditions do you have or have had?" />
    </ModalWithBottomBtn>
  );
};
export default OthersModal;
