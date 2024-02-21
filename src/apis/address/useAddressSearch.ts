import { useQuery } from '@tanstack/react-query';
import { getAddress } from './queryFn';

export interface Address {
  address_name: string;
  latitude: string;
  longitude: string;
}

const useAddress = (keyword: string) => {
  return useQuery({
    queryKey: ['address', keyword] as const,
    queryFn: () => getAddress(keyword),
    select: (data): Address[] => {
      const response = data.documents.map((document) => {
        return {
          address_name: document.address_name,
          latitude: document.y,
          longitude: document.x,
        };
      });

      return response;
    },
  });
};

export default useAddress;
