import { forwardRef } from 'react';
import { Alert, Linking } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { generateGlobalTransakUrl } from 'Utils/generate-global-transak-url';
import { validateURL } from 'Utils/validate-url';
import { Events } from 'Constants/events';
import { TransakWebViewInputs } from 'Types/sdk-config.types';
import { EventTypes } from 'Types/events.types';

const TransakWebView = forwardRef<WebView, TransakWebViewInputs>(({ transakConfig, onTransakEvent, ...webviewProps }, ref) => {
  const transakUrl = generateGlobalTransakUrl(transakConfig);
  const referrer = validateURL(transakConfig.referrer);
  const currentWebviewProps = { ...webviewProps };

  delete currentWebviewProps.sharedCookiesEnabled;
  delete currentWebviewProps.injectedJavaScript;
  delete currentWebviewProps.injectedJavaScriptBeforeContentLoaded;
  delete currentWebviewProps.onMessage;
  delete currentWebviewProps.mediaPlaybackRequiresUserAction;

  const openInAppBrowser = async (url: string) => {
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
          includeReferrer: true,
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

    const { data } = event.nativeEvent || {};

    if (data?.includes('/googlepay')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      openInAppBrowser(data.replace('isWebView', 'useAsExternalPayment'));
      return;
    }

    if (data?.startsWith('https://secure.plaid.com')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      openInAppBrowser(data);
      return;
    }

    if (onTransakEvent) {
      try {
        const parsedData = JSON.parse(data) as EventTypes;

        if (parsedData.event_id && Object.values(Events).includes(parsedData.event_id)) {
          const { event_id: eventId, data: eventData } = parsedData || {};

          onTransakEvent(eventId, eventData);
        }
      } catch (error) {
        throw new Error('Invalid transak event');
      }
    }
  };

  return (
    <WebView
      ref={ref}
      {...currentWebviewProps}
      originWhitelist={['*']}
      source={{
        uri: transakUrl,
        headers: { Referrer: referrer },
      }}
      enableApplePay
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      onMessage={onMessageHandler}
    />
  );
});

export { TransakWebView };
