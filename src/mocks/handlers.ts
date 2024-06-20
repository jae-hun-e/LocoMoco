import { api } from '@/constants/mswPath';
import { http } from 'msw';
import response from './response';
import mgcList from './response/mgcList.json';

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

  http.get(api.mgcList, ({ request }: { request: Request }) => {
    const search = new URL(request.url).searchParams.get('search');
    const tags = new URL(request.url).searchParams.getAll('tags').map(Number);

    if (search || tags) {
      const filtedMgcList = mgcList.data.filter((item) => {
        const matchesSearch = search ? item.location.address.includes(search) : true;
        const matchesTags = tags.length > 0 ? tags.every((tag) => item.tags.includes(tag)) : true;

        return matchesSearch && matchesTags;
      });

      return new Response(JSON.stringify({ data: filtedMgcList }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }),

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
