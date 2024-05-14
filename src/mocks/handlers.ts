import { api } from '@/constants/mswPath';
import { http } from 'msw';
import response from './response';

export const handlers = [
  ...[api.category, api.mgc].map((path) =>
    http.get(`${path}`, () => {
      return new Response(JSON.stringify(response[path]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }),
  ),
  http.get(api.address, () => {
    return new Response(JSON.stringify(response[api.address]), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
