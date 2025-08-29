export type URLString = string & { __brand: 'URLString' };

export type QueryParams = {
  apiKey: string;
  sessionId: string;
  themeColor?: string;
  brandColor?: string;
  textPrimaryColor?: string;
  textSecondaryColor?: string;
  borderColor?: string;
  surfaceFillColor?: string;
  widgetBackgroundFillColor?: string;
  greenColor?: string;
  redColor?: string;
  labelTextColor?: string;
  primaryButtonTextColor?: string;
  primaryButtonFillColor?: string;
  colorMode?: string;
};

export type AppQueryParams = {
  sdkName: string;
  sdkVersion: string;
} & QueryParams;
