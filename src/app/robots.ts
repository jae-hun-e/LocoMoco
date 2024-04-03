import { routes } from '@/constants/routeURL';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const { home, create, chat, search, signin, mypage, editMGC } = routes;

  return {
    rules: [
      {
        userAgent: '*',
        allow: [home, search],
        disallow: [`${mypage}/*`, signin, create, `${editMGC}/*`, `${chat}/*`],
      },
    ],
    host: process.env.NEXT_PUBLIC_SITE_BASE_URL,
    sitemap: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/sitemap.xml`,
  };
}
