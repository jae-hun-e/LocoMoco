import client from '@/apis/core';

interface Category {
  data: {
    category_id: number;
    category_name: string;
    input_type: 'COMBOBOX' | 'CHECKBOX' | 'RADIOGROUP';
    tags: TagType[];
  }[];
}

export interface TagType {
  tag_id: number;
  tag_name: string;
}
export const getCategory = async ({ type }: { type: 'USER' | 'MOGAKKO' }) => {
  const { data } = await client.get<Category>({ url: `/category?type=${type}` });

  return data;
};

export interface CreateMGCReq {
  creatorId: number;
  title: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    city: string;
  };
  startTime: string;
  endTime: string;
  deadline: string;
  maxParticipants: number;
  content?: string;
  tags?: number[];
}

export const createMGC = async (createMGCReq: CreateMGCReq) =>
  await client.put({ url: '/mogakko/map', data: createMGCReq });
