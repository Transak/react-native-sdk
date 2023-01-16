import React, { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { generateUrl } from './generate-url';
import { eventListener } from './event-listener';

function ReactNativeSdk({ queryParams, onTransakEventHandler, ...webviewProps }) {
  const transakConfig = { ...queryParams };

  if (!transakConfig.partnerOrderId) {
    const dummyRandomNumber = `${new Date().valueOf()}-${Math.round(Math.random()*100000000)}`;
    transakConfig.partnerOrderId = `TRSK-DUMMY-${transakConfig.apiKey}-${dummyRandomNumber}`;
  }

  const transakUrl = generateUrl(transakConfig);

  delete webviewProps.injectJavaScript;
  delete webviewProps.sharedCookiesEnabled;
  delete webviewProps.injectedJavaScript;
  delete webviewProps.injectedJavaScriptBeforeContentLoaded;

  const openTransak = async (url) => {
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
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onNavigationStateChange = (navState) => {
    if (navState.url.includes('/googlepay')) {
      openTransak(navState.url.replace('isWebView', 'useAsExternalPayment'));
    }

    if (webviewProps.onNavigationStateChange) {
      webviewProps.onNavigationStateChange(navState);
    }
  };

  useEffect(() => {
    const { unbindListener } = eventListener(transakConfig, onTransakEventHandler);

    return function () {
      unbindListener();
    };
  }, []);

  return (
    <WebView
      {...webviewProps}
      source={{ uri: transakUrl }}
      enableApplePay
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}

export { ReactNativeSdk };
