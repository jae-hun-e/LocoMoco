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

//
interface Category {
  data: {
    category_id: number;
    category_name: string;
    tags: [
      {
        tag_id: number;
        tag_name: string;
      },
    ];
  }[];
}
export const getCategory = async ({ type }: { type: 'USER' | 'MOGAKKO' }) => {
  const { data } = await client.get<Category>({ url: `/category?type=${type}` });

  console.log('category data', data);
  return data;
};
