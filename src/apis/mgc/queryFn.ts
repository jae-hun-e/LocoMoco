import client from '@/apis/core';

interface TestType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export const testQuery = async (id: number) => {
  return await client.get<TestType>({ url: `/posts/${id}` });
};

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
