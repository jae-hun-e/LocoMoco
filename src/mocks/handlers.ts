import { apiFullUrl, apiPath } from '@/constants/mswPath';
import { http } from 'msw';
import response from './response';
import addressList from './response/addressList.json';
import mgcList from './response/mgcList.json';

const setBaseUrl = (path: string, isAbsoluteUrl: boolean) => {
  return isAbsoluteUrl ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : path;
};

export const handlers = (isAbsoluteUrl: boolean) => {
  return [
    ...[apiPath.mgc, apiPath.users, apiPath.reviewContents].map((path) =>
      http.get(setBaseUrl(path, isAbsoluteUrl), () => {
        return new Response(JSON.stringify(response[path]), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
    ),

    http.get(setBaseUrl(apiPath.category, isAbsoluteUrl), ({ request }: { request: Request }) => {
      const type = new URL(request.url).searchParams.get('type');

      if (type === 'MOGAKKO') {
        return new Response(JSON.stringify(response[apiPath.category]), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }),
    http.get(setBaseUrl(apiPath.mgcList, isAbsoluteUrl), ({ request }: { request: Request }) => {
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

    http.get(apiFullUrl.address, ({ request }: { request: Request }) => {
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

    http.post(setBaseUrl(apiPath.createReview, isAbsoluteUrl), async () => {
      return new Response(JSON.stringify(response[apiPath.createReview]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }),
  ];
};
