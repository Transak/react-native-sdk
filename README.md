# Transak React Native SDK

A React Native SDK for decentralised applications to onboard their global user base with fiat currency.

## Installation

```sh
# Using yarn
yarn add @transak/react-native-sdk

# Using npm
npm install @transak/react-native-sdk
```

Install these required peer dependencies to facilitate auto-linking.

```sh
# Using yarn
yarn add react-native-webview
yarn add react-native-inappbrowser-reborn
yarn add @react-native-community/netinfo

# Using npm
npm install react-native-webview
npm install react-native-inappbrowser-reborn
npm install @react-native-community/netinfo
```

## Example usage

```js
import TransakWebView from '@transak/react-native-sdk';

function TransakReactNativeSdkIntegration() {
  const transakEventHandler = (event, data) => {
    switch(event) {
      case 'ORDER_PROCESSING':
        console.log(data);
        break;

      case 'ORDER_COMPLETED':
        console.log(data);
        break;

      default:
        console.log(data);
    }
  };

  return (
    <TransakWebView
      queryParams={{
        apiKey: '<your-api-key>',
        environment: '<environment: STAGING/PRODUCTION>',
        // .....
        // For the full list of query params refer Props section below
      }}
      onTransakEventHandler={transakEventHandler}

      style={}          // react-native-webview prop
      onLoadStart={}    // react-native-webview prop
      onLoadEnd={}      // react-native-webview prop
      // .....
      // For the full list of react-native-webview props refer Props section below
    />
  );
}
```

### Props

| Prop                  | Description                                                                                                   |
|:----------------------|:--------------------------------------------------------------------------------------------------------------|
| queryParams           | Refer [here](https://docs.transak.com/docs/query-parameters) for the full list of query params                |
| onTransakEventHandler | Accepts callback function to listen to order related [events](https://docs.transak.com/docs/websocket-events) |

This component accepts most of the [react-native-webview props](https://github.com/react-native-webview/react-native-webview/blob/HEAD/docs/Reference.md), except the following: source, injectJavaScript, sharedCookiesEnabled, injectedJavaScript, injectedJavaScriptBeforeContentLoaded

## License

ISC Licensed. Copyright (c) 2023 Transak Inc.
