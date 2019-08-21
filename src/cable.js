import ActionCable from "@rails/actioncable";

import { API_HOST } from "./constants";
import state from "./state";
import { camelize } from "./stringCase";

let consumer = null;

const getEndpoint = () => {
  const [protocol, host] = API_HOST.split("://");
  const wsProtocol = protocol === "https" ? "wss" : "ws";
  return `${wsProtocol}://${host}/cable/${state.getToken()}`;
};

const getConsumer = () => {
  if (!consumer) {
    consumer = ActionCable.createConsumer(getEndpoint());
  }
  return consumer;
};

/**
 * There are a few functions on the client that will establish a WebSocket
 * connection and call a callback function when data is received. For these
 * functions, in order to avoid leaking memory, it's important to ensure that
 * when you're done with the subscription (for instance when the component
 * containing it is unmounted) that you call `unsubscribe` on the subscription
 * object. An example with React of using these functions is below:
 *
 *     import { onNotificationReceived } from "@culturehq/client";
 *
 *     class MyComponent {
 *       state = { lastNotification: null };
 *
 *       componentDidMount() {
 *         this.subscription = onNotificationReceived(notification => {
 *           this.setState({ lastNotification: notification });
 *         });
 *       }
 *
 *       componentWillUnmount() {
 *         if (this.subscription) {
 *           this.subscription.unsubscribe();
 *         }
 *       }
 *
 *       render() {
 *         const { lastNotification } = this.state;
 *
 *         return <span>{lastNotification}<span>;
 *       }
 *     }
 */
const subscribe = channel => callback => (
  getConsumer().subscriptions.create(channel, {
    received: data => callback(camelize(data))
  })
);

export const disconnect = () => {
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
};

export const onEventStarting = subscribe("EventStartingChannel");

export const onLeaderboardUpdated = subscribe("LeaderboardChannel");

export const onNotificationReceived = subscribe("NotificationChannel");

export const onRecognitionCreated = subscribe("RecognitionChannel");

export const onUserActivityCreated = subscribe("UserActivityChannel");
