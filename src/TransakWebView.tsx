import { useEffect, forwardRef } from 'react';
import { Alert, Linking } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { generateGlobalTransakUrl } from 'Utils/generate-global-transak-url';
import { eventListener } from 'Utils/event-listener';
import { TransakWebViewInputs } from 'Types/sdk-config.types';

const TransakWebView = forwardRef<WebView, TransakWebViewInputs>(({ transakConfig, onTransakEvent, ...webviewProps }, ref) => {
  const transakUrl = generateGlobalTransakUrl(transakConfig);
  const currentWebviewProps = { ...webviewProps };

  delete currentWebviewProps.sharedCookiesEnabled;
  delete currentWebviewProps.injectedJavaScript;
  delete currentWebviewProps.injectedJavaScriptBeforeContentLoaded;
  delete currentWebviewProps.onMessage;
  delete currentWebviewProps.mediaPlaybackRequiresUserAction;

  const openGooglePayUrl = async (url: string) => {
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

  const onMessageHandler = (event: WebViewMessageEvent) => {
    if (webviewProps.onMessage) {
      webviewProps.onMessage(event);
    }

    const url = event.nativeEvent.data;

    if (url.includes('/googlepay')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      openGooglePayUrl(url.replace('isWebView', 'useAsExternalPayment'));
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
      ref={ref}
      {...currentWebviewProps}
      originWhitelist={['*']}
      source={{ uri: transakUrl }}
      enableApplePay
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      onMessage={onMessageHandler}
    />
  );
});

export { TransakWebView };
