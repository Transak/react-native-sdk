import Pusher from 'pusher-js/react-native';
import { OnTransakEvent } from 'Types/sdk-config.types';
import { EventTypes } from 'Types/events.types';
import { Order } from 'Types/order.types';

function eventListener(cb: OnTransakEvent, apiKey: string) {
  const pusher = new Pusher('1d9ffac87de599c61283', { cluster: 'ap2' });
  const epoch = Date.now();
  const channelName = `${apiKey}-${epoch}}`;

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
