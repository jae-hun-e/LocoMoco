import { Address } from '@/apis/address/useAddressSearch';
import AddressList from '@/app/(home)/_components/AddressList';
import SearchBarFilter from '@/app/(home)/_components/SearchBarFilter';
import render from '@/libs/test/render';
import { screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';

const address = [
  {
    address_name: '서울 서초구 서초동',
    latitude: 37.4900861966504,
    longitude: 127.01953478052,
  },
  {
    address_name: '서울 서초구 서초1동',
    longitude: 127.019530273485,
    latitude: 37.4901474659139,
  },
  {
    address_name: '서울 서초구 서초2동',
    longitude: 127.025076125816,
    latitude: 37.4921394474613,
  },
  {
    address_name: '서울 서초구 서초3동',
    longitude: 127.01200750943,
    latitude: 37.4837080639576,
  },
  {
    address_name: '서울 서초구 서초4동',
    longitude: 127.022170883244,
    latitude: 37.5026854085131,
  },
];

let user: UserEvent;
let textInput: HTMLElement;

describe('SearchBarFilter 컴포넌트 테스트', () => {
  beforeEach(async () => {
    const { user: currentUser } = await render(<SearchBarFilter />);
    user = currentUser;
    textInput = screen.getByPlaceholderText('동명(읍, 면)으로 검색(ex. 서초동).');
  });

  it('검색어 입력 전에는 AddressList 컴포넌트가 렌더되지 않는다.', () => {
    expect(screen.queryByTestId('address-container')).not.toBeInTheDocument();
  });

  it('"서초동" 검색 시 서초동에 해당하는 주소리스트가 나타난다.', async () => {
    await user.type(textInput, '서초동');

    address.forEach((addressItem) => {
      const item = screen.getByText(addressItem.address_name);
      expect(item).toBeInTheDocument();
    });
  });

  it('주소 리스트에서 "서울 서초구 서초동" 텍스트 클릭하면 handleAddressClick이 호출된다.', async () => {
    const mockChangeCenter = vi.fn();
    const mockChangeAddress = vi.fn();
    const mockSetShow = vi.fn();

    const mockHandleAddressClick = (data: Address) => {
      const { latitude, longitude } = data;
      mockChangeCenter(latitude, longitude);
      mockChangeAddress(latitude, longitude);
      mockSetShow(false);
    };

    await render(
      <AddressList
        address={address}
        onClick={mockHandleAddressClick}
      />,
    );

    for (const addressItem of address) {
      const item = screen.getByText(addressItem.address_name);
      await user.click(item);

      expect(mockChangeCenter).toHaveBeenCalledWith(addressItem.latitude, addressItem.longitude);
      expect(mockChangeAddress).toHaveBeenCalledWith(addressItem.latitude, addressItem.longitude);
      expect(mockSetShow).toHaveBeenCalledWith(false);
    }
  });
});
