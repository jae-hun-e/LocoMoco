import { getMGCTotalList } from '@/apis/mgcList/useMGCTotalList';
import { routes } from '@/constants/routeURL';
import { MetadataRoute } from 'next';

type Sitemap = Array<{
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>;
const MGCDatas: Sitemap = [];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let cursor = undefined;

  do {
    const data = await getMGCTotalList({ searchType: 'TOTAL', pageSize: 50, cursor });

    MGCDatas.push(
      ...data.map((mgc) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/mgc/${mgc.id}`,
        lastModified: mgc.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.7,
      })),
    );

    if (data.length > 0) {
      const ids = data.map((item) => item.id);
      cursor = Math.min(...ids);
    } else {
      cursor = undefined;
    }
  } while (cursor !== undefined);

  const offset = new Date().getTimezoneOffset() * 60000;

  const staticSitemap: Sitemap = [routes.home, routes.search].map((path) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${path}`,
    lastModified: new Date(Date.now() - offset),
    changeFrequency: 'daily',
    priority: path === '/' ? 1 : 0.7,
  }));

  const sitemapEntries = staticSitemap.concat(MGCDatas);

  return sitemapEntries;
}
