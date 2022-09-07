import slugify from 'slugify';

export const strToSlug = (str: string): string =>
  slugify(str, {
    remove: /[^0-9a-zA-Z\s]/gim,
    lower: true,
    trim: true,
  });

export const normalizeId = (str: string): string => str.split('/')[5];
