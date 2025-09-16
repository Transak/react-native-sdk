import { Events } from 'Constants/events';

export type EventIds = keyof typeof Events;
export type EventTypes = {
  event_id: Events;
  data: unknown;
};
