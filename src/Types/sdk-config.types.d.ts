import { WebViewProps } from 'react-native-webview';
import { Events } from 'Constants/events';

export type TransakConfig = {
  widgetUrl: string;
  referrer: string;
  themeColor?: string;
};

export type OnTransakEvent = (event: Events, data: unknown) => void;

export type TransakWebViewInputs = {
  transakConfig: TransakConfig;
  onTransakEvent: OnTransakEvent;
} & WebViewProps;
