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
  // TODO: 에러 중앙화 후 수정 [24.04.14]
  try {
    let cursor = undefined;

    do {
      const data = await getMGCTotalList({ searchType: 'TITLE_CONTENT', pageSize: 50, cursor });

      if (!data) break;

      MGCDatas.push(
        ...data.map(({ id, updatedAt }) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/mgc/${id}`,
          lastModified: updatedAt,
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
  } catch (e) {
    console.log('에러', e);
  }

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
