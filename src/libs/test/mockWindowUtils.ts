export const mockGeolocation = () => {
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
};

export const mockPermissions = () => {
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
};

export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
};

export const mockResizeObserver = () => {
  global.ResizeObserver = class MockedResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
};
