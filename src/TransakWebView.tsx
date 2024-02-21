import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { generateURL } from 'Utils/generate-url';
import { eventListener } from 'Utils/event-listener';
import { TransakWebViewInputs } from 'Types/sdk-config.types';

function TransakWebView({ transakConfig, onTransakEvent, ...webviewProps }: TransakWebViewInputs) {
  const transakUrl = generateURL(transakConfig);
  const currentWebviewProps = { ...webviewProps };

  delete currentWebviewProps.sharedCookiesEnabled;
  delete currentWebviewProps.injectedJavaScript;
  delete currentWebviewProps.injectedJavaScriptBeforeContentLoaded;
  delete currentWebviewProps.onMessage;

  const openTransak = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // Android Properties
          showTitle: false,
          toolbarColor: transakConfig.themeColor ? `#${transakConfig.themeColor}` : '#2575fc',
          secondaryToolbarColor: '#ffffff',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          hasBackButton: false,
          showInRecents: false,
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: transakConfig.themeColor ? `#${transakConfig.themeColor}` : '#2575fc',
          preferredControlTintColor: '#ffffff',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
        });
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  const onMessageHandler = async (event: WebViewMessageEvent) => {
    if (webviewProps.onMessage) {
      webviewProps.onMessage(event);
    }

    const url = event.nativeEvent.data;

    if (url.includes('/googlepay')) {
      await openTransak(url.replace('isWebView', 'useAsExternalPayment'));
    }
  };

  useEffect(() => {
    const { unbindListener } = eventListener(transakConfig, onTransakEvent);

    return () => {
      unbindListener();
    };
  }, []);

  return (
    <WebView
      {...currentWebviewProps}
      originWhitelist={['*']}
      source={{ uri: transakUrl }}
      enableApplePay
      allowsInlineMediaPlayback
      onMessage={onMessageHandler}
    />
  );
}

export { TransakWebView };
