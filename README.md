# Transak React Native SDK

A React Native SDK for decentralized applications to onboard their global user base with fiat currency.

## Migrating from v2.x

- 🔗 **Widget URL Mandatory**: This SDK now only supports API-based Transak Widget URL. Please refer the detailed migration guide [here](https://docs.transak.com/docs/migration-to-api-based-transak-widget-url).

## Installation

```sh
npm i @transak/react-native-sdk
```

Install these required peer dependencies to facilitate auto-linking.

```sh
npm i react-native-webview
npm i react-native-inappbrowser-reborn
npm i @react-native-community/netinfo
```

## Example usage

```tsx
import { TransakWebView, Events, TransakConfig, OnTransakEvent, Order } from '@transak/react-native-sdk';

function TransakWebViewIntegration() {
  const transakConfig: TransakConfig = {
    widgetUrl: 'api-generated-widgetUrl', // Required
    referrer: 'https://your-app.com', // Required - Must be a valid URL
  };

  const onTransakEventHandler: OnTransakEvent = (event, data) => {
    switch (event) {
      case Events.TRANSAK_WIDGET_INITIALISED:
        console.log('Widget initialized:', event, data);
        break;

      case Events.TRANSAK_ORDER_CREATED:
        console.log('Order created:', event, data);
        break;

      case Events.TRANSAK_ORDER_SUCCESSFUL:
        console.log('Order successful:', event, data);
        break;

      case Events.TRANSAK_ORDER_FAILED:
        console.log('Order failed:', event, data);
        break;

      case Events.TRANSAK_WIDGET_CLOSE:
        console.log('Widget closed:', event, data);
        break;

      default:
        console.log('Widget event:', event, data);
    }
  };

  return (
    <TransakWebView
      transakConfig={transakConfig}
      onTransakEvent={onTransakEventHandler}
      // .....
      // For the full list of react-native-webview props refer Props section below
    />
  );
}
```

### Props

| Prop           | Description                                                                                                 |
|:---------------|:------------------------------------------------------------------------------------------------------------|
| transakConfig  | Refer transakConfig section below                                                                           |
| onTransakEvent | Callback function to listen to widget events such as initialization, order creation, success, failure, etc. |

<br />This component accepts most of the [react-native-webview props](https://github.com/react-native-webview/react-native-webview/blob/HEAD/docs/Reference.md), except the following: sharedCookiesEnabled, injectedJavaScript, injectedJavaScriptBeforeContentLoaded, onMessage, mediaPlaybackRequiresUserAction

### transakConfig

| Property  | Type   | Required | Description                                                                                                              |
|:----------|:-------|:---------|:-------------------------------------------------------------------------------------------------------------------------|
| widgetUrl | string | Yes      | [API generated widgetUrl](https://docs.transak.com/docs/migration-to-api-based-transak-widget-url#widget-url-generation) |
| referrer  | string | Yes      | Valid URL of your app/website (e.g., https://your-app.com)                                                               |

### Available Events

The SDK emits the following widget events:

- `TRANSAK_WIDGET_INITIALISED` - When the widget is loaded and ready
- `TRANSAK_ORDER_CREATED` - When a new order is created
- `TRANSAK_ORDER_SUCCESSFUL` - When an order is completed successfully
- `TRANSAK_ORDER_CANCELLED` - When an order is canceled
- `TRANSAK_ORDER_FAILED` - When an order fails
- `TRANSAK_WALLET_REDIRECTION` - When user is redirected to wallet
- `TRANSAK_WIDGET_CLOSE` - When the widget is closed

## License

ISC Licensed. Copyright (c) Transak Inc.
