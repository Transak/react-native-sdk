import { Environments } from './environments';

export const WebAppUrls = {
  DEVELOPMENT: 'https://<enter-system-ip>:5005/',
  DEV: 'https://global-dev.transak.com',
  DEV_IFRAME: 'https://global-iframe-dev.transak.com',
  BETA: 'https://global-beta.transak.com',
  [Environments.STAGING]: 'https://global-stg.transak.com',
  [Environments.PRODUCTION]: 'https://global.transak.com',
};
