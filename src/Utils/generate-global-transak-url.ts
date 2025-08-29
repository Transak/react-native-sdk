import qs from 'query-string';
import { WebAppUrls } from 'Constants/web-app-urls';
import { TransakConfig } from 'Types/sdk-config.types';
import { Environments } from 'Constants/environments';
import packageJson from 'package.json';
import { AppQueryParams, URLString } from 'Types/query-params.types';
import { validateURL, isValidURL } from 'Utils/validate-url';

export function generateGlobalTransakUrl(configData: TransakConfig): URLString {
  const { name: sdkName, version: sdkVersion } = packageJson;
  const { environment = Environments.STAGING, apiKey, sessionId, referrer, ...rawQueryParams } = configData || {};

  if (!apiKey || !sessionId || !isValidURL(referrer)) {
    throw new Error('apiKey, sessionId and referrer are required');
  }
  // filter excluded keys
  const excludeKeys = ['environment', 'widgetWidth', 'widgetHeight'];
  const filteredQp = Object.fromEntries(Object.entries(rawQueryParams).filter(([key]) => !excludeKeys.includes(key)));

  const queryParams: AppQueryParams = { sdkName, sdkVersion, apiKey, sessionId, ...filteredQp };
  const urlString = qs.stringifyUrl(
    {
      url: WebAppUrls[environment],
      query: queryParams,
    },
    { arrayFormat: 'comma' },
  );

  return validateURL(urlString);
}
