'use client';

import { MenuIcon } from 'lucide-react';

const MenuBtn = (props: { onClick?: () => void }) => {
  return (
    <button
      onClick={() => {
        props.onClick?.();
      }}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuBtn;
