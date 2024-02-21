import { Environments } from './environments';

export const WebAppUrls = {
  [Environments.DEVELOPMENT]: 'http://localhost:5005',
  [Environments.STAGING]: 'https://global-stg.transak.com',
  [Environments.PRODUCTION]: 'https://global.transak.com',
};
