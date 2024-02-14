import { ReactNode } from 'react';
import HeaderLeft from '@/app/_components/header/HeaderLeft';
import { MenuIcon, MoreVerticalIcon, ShareIcon } from 'lucide-react';

interface Props {
  readonly children?: ReactNode;
}

const HeaderContainer = ({ children }: Props) => {
  return (
    <header className="flex h-14 w-full items-center justify-between">
      <HeaderLeft />
      {children}
    </header>
  );
};

const Right = ({ children }: Props) => {
  return <div className="flex items-center gap-20pxr">{children}</div>;
};

// TODO: 안에 내용이 정해지면 수정[24/02/14]
const Menu = () => <MenuIcon />;
const Share = () => <ShareIcon />;
const Option = () => <MoreVerticalIcon />;

const Header = Object.assign(HeaderContainer, {
  Right,
  Menu,
  Share,
  Option,
});

export default Header;
