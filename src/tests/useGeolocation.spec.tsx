import { toast } from '@/components/ui/use-toast';
import useGeolocation, { LocationType } from '@/hooks/useGeolocation';
import { act, renderHook } from '@testing-library/react';

interface HookResult {
  current: LocationType;
}

const mockPush = vi.fn();

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

const mockCoords = {
  latitude: 10,
  longitude: 10,
};

const mockGeolocationPermission = (state: string) => {
  Object.defineProperty(window.navigator, 'geolocation', {
    value: {
      getCurrentPosition: vi.fn().mockImplementation((success, error) =>
        Promise.resolve(
          state === 'granted'
            ? success({
                coords: mockCoords,
              })
            : error(),
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
          state: state,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      ),
    },
    writable: true,
  });
};

describe('위치 접근 권한을 허용한 경우', () => {
  let hookResult: HookResult = {} as HookResult;

  beforeEach(async () => {
    mockGeolocationPermission('granted');

    await act(async () => {
      const { result } = renderHook(() => useGeolocation());
      hookResult = result;
    });
  });

  it('toast메시지가 나타나지 않는다.', () => {
    expect(toast).not.toBeCalled();
  });

  it('현재 위치 좌표와 loaded값을 담은 객체를 반환한다.', () => {
    expect(hookResult.current.loaded).toEqual(true);
    expect(hookResult.current.coordinates).toEqual({
      lat: mockCoords.latitude,
      lng: mockCoords.longitude,
    });
  });
});

describe('위치 접근 권한을 허용하지 않은 경우', () => {
  it("'💡 위치정보를 허용하지 않으면 현재 위치가 표시되지 않습니다!'문구의 toast메시지가 나타난다.", async () => {
    mockGeolocationPermission('denied');

    await act(async () => {
      renderHook(() => useGeolocation());
    });

    expect(toast).toBeCalledWith({
      description: '💡 위치정보를 허용하지 않으면 현재 위치가 표시되지 않습니다!',
    });
  });
});
