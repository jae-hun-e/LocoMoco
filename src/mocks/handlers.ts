import { api } from '@/constants/mswPath';
import { http } from 'msw';
import response from './response';

export const handlers = [
  ...[api.category, api.mgc, api.users, api.reviewContents].map((path) =>
    http.get(`${path}`, () => {
      return new Response(JSON.stringify(response[path]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }),
  ),
  http.get(api.address, ({ request }: { request: Request }) => {
    const query = new URL(request.url).searchParams.get('query');
    if (query === '서초동') {
      return new Response(JSON.stringify(response[api.address]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }),
];
