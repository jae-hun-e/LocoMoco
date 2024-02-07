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
