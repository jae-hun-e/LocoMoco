import client from '@/apis/core';

export interface ResponseType {
  documents: Document[];
  meta: Meta;
}

export interface Document {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: string;
  road_address: string;
}

interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export const getAddress = async (keyword: string) => {
  return client.get<ResponseType>({
    url: 'https://dapi.kakao.com/v2/local/search/address.json',
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
    params: {
      query: keyword,
      page: 1,
      size: 10,
    },
  });
};
