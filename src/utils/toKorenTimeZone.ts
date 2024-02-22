import { format } from 'date-fns';

export const toKorenTimeZone = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
