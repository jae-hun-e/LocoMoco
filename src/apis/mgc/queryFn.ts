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

export const getCategory = async ({ type }: { type: 'USER' | 'MOGAKKO' }) => {
  return await client.get({ url: `/category?type=${type}` });
};
