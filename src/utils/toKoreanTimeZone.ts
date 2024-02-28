import { format } from 'date-fns';

export const toKoreanTimeZone = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
