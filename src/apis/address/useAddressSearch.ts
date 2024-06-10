import { useQuery } from '@tanstack/react-query';
import { getAddress } from './queryFn';

export interface Address {
  addressName: string;
  latitude: number;
  longitude: number;
}

const useAddress = (keyword: string) => {
  return useQuery({
    queryKey: ['address', keyword] as const,
    queryFn: () => getAddress(keyword),
    select: (data): Address[] => {
      const response = data.documents.map(({ address_name, x, y }) => {
        return {
          addressName: address_name,
          latitude: Number(y),
          longitude: Number(x),
        };
      });

      return response;
    },
    enabled: !!keyword,
  });
};

export default useAddress;
