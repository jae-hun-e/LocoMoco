import { MGCSummary } from '@/types/MGCList';
import client from '../core';

export const getOngoingMGCByUserId = async (userId: string) => {
  return client.get<MGCSummary[]>({
    url: `users/${userId}/mogakko/ongoing`,
  });
};

export const getCompleteMGCByUserId = async (userId: string) => {
  return client.get<MGCSummary[]>({
    url: `users/${userId}/mogakko/complete`,
  });
};
