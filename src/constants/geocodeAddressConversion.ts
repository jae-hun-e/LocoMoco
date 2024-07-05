interface RegionInfo {
  region_type: string;
  code: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  x: number;
  y: number;
}

interface GeocodeAddressConversion {
  [key: string]: RegionInfo[];
}

export const geocodeAddressConversion: GeocodeAddressConversion = {
  '서울특별시 서초구 서초1동': [
    {
      region_type: 'B',
      code: '1165010800',
      address_name: '서울특별시 서초구 서초동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '서초구',
      region_3depth_name: '서초동',
      region_4depth_name: '',
      x: 127.01909121413102,
      y: 37.4888536906029,
    },
    {
      region_type: 'H',
      code: '1165051000',
      address_name: '서울특별시 서초구 서초1동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '서초구',
      region_3depth_name: '서초1동',
      region_4depth_name: '',
      x: 127.01957096253298,
      y: 37.49007898260848,
    },
  ],
  '경기도 성남시 분당구 판교동': [
    {
      region_type: 'B',
      code: '4113510800',
      address_name: '경기도 성남시 분당구 판교동',
      region_1depth_name: '경기도',
      region_2depth_name: '성남시 분당구',
      region_3depth_name: '판교동',
      region_4depth_name: '',
      x: 127.09878136729033,
      y: 37.38986806920579,
    },
    {
      region_type: 'H',
      code: '4113565000',
      address_name: '경기도 성남시 분당구 판교동',
      region_1depth_name: '경기도',
      region_2depth_name: '성남시 분당구',
      region_3depth_name: '판교동',
      region_4depth_name: '',
      x: 127.09878136729033,
      y: 37.38986806920579,
    },
  ],
};
