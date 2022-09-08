import generateQueryString from 'query-string';

const TRANSAK_URLS = {
  STAGING: 'https://staging-global.transak.com/',
  PRODUCTION: 'https://global.transak.com/',
};

function generateUrl(config) {
  let queryString = '';

  if (config && config.apiKey) {
    queryString = generateQueryString.stringify(config, { arrayFormat: 'comma' });
  } else throw('[Transak SDK] => Please enter your API Key');

  return `${TRANSAK_URLS[config.environment || 'PRODUCTION']}?${queryString}`;
}

export { generateUrl };