'use client';

import { ShareIcon } from 'lucide-react';

const ShareBtn = (props: { onClick?: () => void }) => {
  return (
    <button
      onClick={() => {
        props.onClick?.();
      }}
    >
      <ShareIcon />
    </button>
  );
};

export default ShareBtn;
