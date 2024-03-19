import ThunderModalContent from './ThunderModalContent';

export interface ThunderFormData {
  endTime: string;
  title: string;
  location: LocationProps;
}

export interface LocationProps {
  address: string;
  latitude: number;
  longitude: number;
  city: string;
}

const ThunderModal = () => {
  return <ThunderModalContent />;
};

export default ThunderModal;
