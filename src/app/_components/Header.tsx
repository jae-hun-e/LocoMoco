import { ReactNode } from 'react';
import { ChevronLeftIcon, MenuIcon, MoreVerticalIcon } from 'lucide-react';

const HeaderContainer = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <header className="flex h-14 w-full items-center justify-around">{children}</header>;
};

const Back = () => {
  return <ChevronLeftIcon />;
};

const Logo = () => <div>LocoMoco</div>;

const Menu = () => <MenuIcon />;

const Option = () => <MoreVerticalIcon />;

const Header = Object.assign(HeaderContainer, {
  Back,
  Logo,
  Menu,
  Option,
});

export default Header;
