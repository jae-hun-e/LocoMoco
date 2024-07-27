import { api } from '@/constants/mswPath';
import { http } from 'msw';
import response from './response';
import addressList from './response/addressList.json';
import mgcList from './response/mgcList.json';

const setBaseUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
};

export const handlers = [
  ...[api.mgc, api.users, api.reviewContents].map((path) =>
    http.get(setBaseUrl(path), () => {
      return new Response(JSON.stringify(response[path]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }),
  ),

  http.get(setBaseUrl(api.category), ({ request }: { request: Request }) => {
    const type = new URL(request.url).searchParams.get('type');
    if (type === 'MOGAKKO') {
      return new Response(JSON.stringify(response[api.category]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }),
  http.get(setBaseUrl(api.mgcList), ({ request }: { request: Request }) => {
    const search = new URL(request.url).searchParams.get('search');
    const tags = new URL(request.url).searchParams.getAll('tags').map(Number);

    if (search || tags) {
      const filtedMgcList = mgcList.data.filter((item) => {
        const matchesSearch = search ? item.location.address.includes(search) : true;
        const matchesTags = tags.length > 0 ? tags.some((tag) => item.tags.includes(tag)) : true;
        // const matchesTags = tags.length > 0 ? tags.every((tag) => item.tags.includes(tag)) : true;

        return matchesSearch && matchesTags;
      });

      return new Response(JSON.stringify({ data: filtedMgcList }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }),

  http.get(setBaseUrl(api.address), ({ request }: { request: Request }) => {
    const query = new URL(request.url).searchParams.get('query');

    if (query) {
      const address = addressList.documents.filter((e) =>
        e.address_name.replace(/\d+/g, '').includes(query),
      );

      return new Response(JSON.stringify({ documents: address }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }),
  http.post(setBaseUrl(api.createReview), async () => {
    return new Response(JSON.stringify(response[api.createReview]), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
