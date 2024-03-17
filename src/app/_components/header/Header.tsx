import { ReactNode } from 'react';
import HeaderLeft from '@/app/_components/header/HeaderLeft';
import { MoreVerticalIcon, ShareIcon } from 'lucide-react';
import MenuBtn from './MenuBtn';

interface Props {
  readonly children?: ReactNode;
}

const HeaderContainer = ({ children }: Props) => {
  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between bg-layer-1">
        <HeaderLeft />
        {children}
      </header>
      <div className="mb-14" />
    </>
  );
};

const Right = ({ children }: Props) => {
  return <div className="flex items-center gap-20pxr">{children}</div>;
};

interface ButtonProps {
  onClick?: () => void;
}

// TODO: 안에 내용이 정해지면 수정[24/02/14]
const Menu = (props: ButtonProps) => <MenuBtn {...props} />;

const Share = () => <ShareIcon />;
const Option = () => <MoreVerticalIcon />;

const Header = Object.assign(HeaderContainer, {
  Right,
  Menu,
  Share,
  Option,
});

export default Header;
