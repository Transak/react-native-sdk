import generateQueryString from 'query-string';

const TRANSAK_URLS = {
  LOCAL_DEVELOPMENT: 'https://10.0.2.2:5005/',
  STAGING: 'https://global-stg.transak.com/',
  PRODUCTION: 'https://global.transak.com/',
};

function generateUrl(config) {
  let queryParams = {};
  let queryString = '';

  if (config && config.apiKey) {
    Object.keys(config).map((key) => {
      if (config[key] instanceof Object) {
        queryParams[key] = JSON.stringify(config[key]);
      } else queryParams[key] = config[key];
    });

    queryString = generateQueryString.stringify(queryParams, { arrayFormat: 'comma' });
  } else throw('[Transak SDK] => Please enter your API Key');

  return `${TRANSAK_URLS[config.environment || 'PRODUCTION']}?${queryString}`;
}

export { generateUrl };
