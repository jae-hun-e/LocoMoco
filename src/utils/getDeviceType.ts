export const getDeviceType = () => {
  const userAgent = window.navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android|Windows Phone/i.test(userAgent);
  const isTablet = /iPad|Android|Windows Phone/i.test(userAgent);

  if (isMobile) {
    return 'phone';
  } else if (isTablet) {
    return 'pad';
  } else {
    return 'desktop';
  }
};
