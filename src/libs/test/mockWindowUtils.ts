export const mockGeolocation = {
  granted: (coords: { latitude: number; longitude: number }) => {
    Object.defineProperty(window.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn().mockImplementation((success) =>
          Promise.resolve(
            success({
              coords,
            }),
          ),
        ),
      },
      writable: true,
    });
  },
  denied: () => {
    Object.defineProperty(window.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi
          .fn()
          .mockImplementation((success, error) => Promise.resolve(error())),
      },
      writable: true,
    });
  },
};

export const mockPermissions = {
  granted: () => {
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
  },
  denied: () => {
    Object.defineProperty(window.navigator, 'permissions', {
      value: {
        query: vi.fn(() =>
          Promise.resolve({
            name: 'geolocation',
            state: 'denied',
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          }),
        ),
      },
      writable: true,
    });
  },
};

export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
};
