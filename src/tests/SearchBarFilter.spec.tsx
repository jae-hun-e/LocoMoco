import { Address } from '@/apis/address/useAddressSearch';
import AddressList from '@/app/(home)/_components/AddressList';
import HomeSearchBarFilter from '@/app/(home)/_components/HomeSearchBarFilter';
import { seochodongList } from '@/constants/searchResultAddressList';
import setupRender from '@/libs/test/render';
import { screen, waitFor } from '@testing-library/react';

const setup = async () => {
  const { user } = await setupRender(<HomeSearchBarFilter />);
  const textInput = screen.getByPlaceholderText('동명(읍, 면)으로 검색(ex. 서초동)');

  return { user, textInput };
};

describe('SearchBarFilter 컴포넌트 테스트', () => {
  it('검색어 입력 전에는 AddressList 컴포넌트가 렌더되지 않는다.', async () => {
    await setup();

    expect(screen.queryByTestId('address-container')).not.toBeInTheDocument();
  });

  it('"서초동" 검색 시 서초동에 해당하는 주소리스트가 나타난다.', async () => {
    const { user, textInput } = await setup();

    await user.type(textInput, '서초동');

    await waitFor(() => {
      seochodongList.forEach((addressItem) => {
        const item = screen.getByText(addressItem.addressName);
        expect(item).toBeInTheDocument();
      });
    });
  });

  it('결과값이 없는 주소를 검색했을 시 "검색 결과가 없어요"가 나타난다.', async () => {
    const { user, textInput } = await setup();

    await user.type(textInput, '없음');
    const item = screen.getByText('검색 결과가 없어요');
    expect(item).toBeInTheDocument();
  });

  it('주소 리스트에서 "서울 서초구 서초동" 텍스트 클릭하면 handleAddressClick이 호출된다.', async () => {
    const { user } = await setup();

    const mockChangeCenter = vi.fn();
    const mockChangeAddress = vi.fn();
    const mockSetShow = vi.fn();

    const mockHandleAddressClick = (data: Address) => {
      const { latitude, longitude, addressName } = data;
      mockChangeCenter(latitude, longitude);
      mockChangeAddress(addressName);
      mockSetShow(false);
    };

    await setupRender(
      <AddressList
        address={seochodongList}
        onClick={mockHandleAddressClick}
      />,
    );

    for (const addressItem of seochodongList) {
      const item = screen.getByText(addressItem.addressName);
      await user.click(item);

      expect(mockChangeCenter).toHaveBeenCalledWith(addressItem.latitude, addressItem.longitude);
      expect(mockChangeAddress).toHaveBeenCalledWith(addressItem.addressName);
      expect(mockSetShow).toHaveBeenCalledWith(false);
    }
  });
});
