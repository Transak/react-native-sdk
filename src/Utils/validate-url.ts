import { URLString } from 'Types/query-params.types';

const isValidURL = (url: string): boolean => {
  if (!url) {
    return false;
  }

  try {
    const urlObject = new URL(url);

    return Boolean(urlObject);
  } catch (error) {
    return false;
  }
};

const validateURL = (url: string): URLString => {
  if (!isValidURL(url)) {
    throw new Error('Invalid URL');
  }

  return url as URLString;
};

export { validateURL, isValidURL };
