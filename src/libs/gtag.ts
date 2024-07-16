export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

type GtagEvent = {
  action: string;
  category: string;
  label: string;
  value: string | number;
};

export const pageview = (url: URL | string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (process.env.NODE_ENV !== 'development') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
