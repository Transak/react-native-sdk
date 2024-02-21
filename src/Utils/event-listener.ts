import Pusher from 'pusher-js/react-native';
import { TransakConfig, OnTransakEvent } from 'Types/sdk-config.types';
import { EventTypes } from 'Types/events.types';
import { Order } from 'Types/order.types';

function eventListener({ apiKey, partnerOrderId }: TransakConfig, cb: OnTransakEvent) {
  const pusher = new Pusher('1d9ffac87de599c61283', { cluster: 'ap2' });
  const channelName = `${apiKey}_${partnerOrderId}`;

  pusher.subscribe(channelName);
  pusher.bind_global((event: EventTypes | 'pusher:pong', data: Order) => {
    if (event !== 'pusher:pong') {
      cb(event, data);
    }
  });

  return {
    unbindListener: () => {
      pusher.unsubscribe(channelName);
      pusher.unbind_global();
    },
  };
}

export { eventListener };
