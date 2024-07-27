import Home from '@/app/(home)/page';
import { geocodeAddressConversion } from '@/constants/geocodeAddressConversion';
import { mockUseKakaoMapLoadStore, mockuseSearchValueStore } from '@/libs/test/mockZustandStore';
import setupRender from '@/libs/test/render';
import { screen, waitFor } from '@testing-library/react';
import categoryList from '../mocks/response/categories.json';
import addressList from '../mocks/response/mgcList.json';

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

Object.defineProperty(window.navigator, 'geolocation', {
  value: {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 0,
            longitude: 0,
          },
        }),
      ),
    ),
  },
  writable: true,
});

Object.defineProperty(window.navigator, 'permissions', {
  value: {
    query: vi.fn(() =>
      Promise.resolve({
        name: 'geolocation',
        state: 'granted',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    ),
  },
  writable: true,
});

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

const mockAddClustererMarkers = vi.fn().mockImplementation((markers) => markers);
const mockSetMap = vi.fn();
const mockSetDraggable = vi.fn();
const mockGetPosition = vi.fn();
const mockMarker = vi.fn().mockImplementation((options) => ({
  setMap: mockSetMap,
  setDraggable: mockSetDraggable,
  getPosition: mockGetPosition,
  options,
}));
const mockCoord2RegionCode = vi.fn();
const mockSetCenter = vi.fn();
const mockMarkerImage = vi.fn().mockImplementation((imageSrc) => ({ imageSrc }));
const mockSize = vi.fn();
const mockLatLng = vi.fn().mockImplementation((lat, lng) => ({ lat, lng }));
const mockGeocoder = vi.fn().mockImplementation(() => ({
  coord2RegionCode: mockCoord2RegionCode,
}));

const cmarker = vi.fn();
const mockMarkerClusterer = vi.fn().mockImplementation(() => ({
  clear: vi.fn(),
  addMarkers: mockAddClustererMarkers,
  markers: cmarker,
}));

global.kakao = {
  maps: {
    Map: vi.fn().mockImplementation(() => ({
      setCenter: mockSetCenter,
      addControl: vi.fn(),
    })),
    services: {
      Geocoder: mockGeocoder,
      Status: {
        OK: 'OK',
      },
    },
    MarkerClusterer: mockMarkerClusterer,
    CustomOverlay: vi.fn().mockImplementation(() => ({
      setMap: vi.fn(),
    })),
    LatLng: mockLatLng,
    Marker: mockMarker,
    Size: mockSize,
    MarkerImage: mockMarkerImage,
    Point: vi.fn(),
    event: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    ZoomControl: vi.fn(),
    ControlPosition: {
      TOPRIGHT: 'TOPRIGHT',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const setup = async (geocodeAddress: string) => {
  mockCoord2RegionCode.mockImplementation((longitude, latitude, callback) => {
    const result = geocodeAddressConversion[geocodeAddress];
    callback(result, 'OK');
  });

  mockUseKakaoMapLoadStore({ isLoad: true });

  const { user } = await setupRender(<Home />);

  const textInput = screen.getByPlaceholderText('동명(읍, 면)으로 검색(ex. 서초동).');
  const ListShowButton = screen.getByText('목록보기');

  return {
    user,
    textInput,
    ListShowButton,
  };
};

global.ResizeObserver = class MockedResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

describe('Home컴포넌트', () => {
  it('검색어 입력 후 주소를 선택하고 필터를 선택하면 해당하는 마커가 나타난다.', async () => {
    const mgcTypeCategory = '일반';
    const languageCategory = 'JS';
    const languageCategory2 = 'Java';
    const studyAreaCategory = '코딩테스트';

    const categorys = [languageCategory, languageCategory2, studyAreaCategory, mgcTypeCategory];

    const categoryTags = categoryList.data.flatMap((category) => category.tags);
    const selectedTagIds = categoryTags
      .filter((tag) => categorys.includes(tag.tag_name))
      .map((x) => x.tag_id);

    const resultAddress = addressList.data.filter(
      (e) =>
        e.location.address.includes('경기도 성남시 분당구 판교동') &&
        selectedTagIds.every((tag) => e.tags.includes(tag)),
    );

    const markers = [];
    for (const address of resultAddress) {
      markers.push({
        options: {
          image: {
            imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          },
          position: { lat: address.location.latitude, lng: address.location.longitude },
        },
        setDraggable: mockSetDraggable,
        setMap: mockSetMap,
        getPosition: mockGetPosition,
      });
    }

    const { user, textInput } = await setup('경기도 성남시 분당구 판교동');

    await user.type(textInput, '판교');
    await user.click(await screen.findByText('경기 성남시 분당구 판교동'));

    await user.click(screen.getByRole('button', { name: 'mgcType buttons category' }));
    await user.click(screen.getByText(mgcTypeCategory));
    await user.click(screen.getByRole('button', { name: 'language buttons category' }));
    await user.click(screen.getByText(languageCategory));
    await user.click(screen.getByRole('button', { name: 'area buttons category' }));
    await user.click(screen.getByText(studyAreaCategory));

    await user.click(screen.getByText('적용하기'));

    expect(mockAddClustererMarkers).toBeCalledWith(markers);
  });

  it('해당 지역에 있는 모각코 리스트가 나타난다.', async () => {
    const currentAddress = '서울특별시 서초구 서초1동';
    mockuseSearchValueStore({ searchValue: { address: currentAddress, tags: undefined } });

    const { user, ListShowButton } = await setup('서울특별시 서초구 서초1동');

    await user.click(ListShowButton);

    const resultAddress = addressList.data.filter((e) =>
      e.location.address.includes(currentAddress),
    );

    await waitFor(async () => {
      for (const address of resultAddress) {
        const titleList = screen.getAllByText(address.title);
        titleList.forEach((title) => expect(title).toBeInTheDocument());
      }
    });
  });

  it('서치바에 검색어를 입력하고, 목록버튼을 누르면 해당하는 모각코 리스트가 나열된다.', async () => {
    const { user, textInput, ListShowButton } = await setup('서울특별시 서초구 서초1동');
    await user.type(textInput, '서초동');
    const address = await screen.findByText('서울 서초구 서초1동');

    await user.click(address);
    const resultAddress = addressList.data.filter((e) =>
      e.location.address.includes('서울특별시 서초구 서초1동'),
    );

    await user.click(ListShowButton);

    await waitFor(async () => {
      for (const address of resultAddress) {
        const titleList = screen.getAllByText(address.title);
        titleList.forEach((title) => expect(title).toBeInTheDocument());
      }
    });
  });
});
