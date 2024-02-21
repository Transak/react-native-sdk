import { Environments } from 'Constants/environments';
import { QueryParams } from 'Types/query-params.types';
import { WebViewProps } from 'react-native-webview';
import { Order } from 'Types/order.types';
import { EventTypes } from 'Types/events.types';

export type TransakConfig = {
  environment: Environments.STAGING | Environments.PRODUCTION;
} & QueryParams;

export type OnTransakEvent = (event: EventTypes, data: Order) => void;

export type TransakWebViewInputs = {
  transakConfig: TransakConfig;
  onTransakEvent: OnTransakEvent;
} & WebViewProps;
