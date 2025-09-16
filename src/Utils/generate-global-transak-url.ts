import qs from 'query-string';
import packageJson from 'package.json';
import { validateURL, isValidURL } from 'Utils/validate-url';
import { TransakConfig } from 'Types/sdk-config.types';

export function generateGlobalTransakUrl(configData: TransakConfig) {
  const { name: sdkName, version: sdkVersion } = packageJson;
  const { widgetUrl, referrer } = configData || {};

  if (!isValidURL(widgetUrl) || !isValidURL(referrer)) {
    throw new Error('widgetUrl and referrer are required and must be valid URL!');
  }

  const urlString = qs.stringifyUrl(
    {
      url: widgetUrl,
      query: { sdkName, sdkVersion },
    },
    { arrayFormat: 'comma' },
  );

  return validateURL(urlString);
}
