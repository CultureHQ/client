import { createConsumer } from "@rails/actioncable";

import config from "./config";
import state from "./state";
import { camelize } from "./stringCase";

let consumer = null;

const getEndpoint = () => {
  const [protocol, host] = config.apiHost.split("://");
  const wsProtocol = protocol === "https" ? "wss" : "ws";
  return `${wsProtocol}://${host}/cable/${state.getToken()}`;
};

const getConsumer = () => {
  if (!consumer) {
    consumer = createConsumer(getEndpoint());
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
 *     import React, { useEffect } from "react";
 *     import { onNotificationReceived } from "@culturehq/client";
 *
 *     const MyComponent = () => {
 *       const [lastNotification, setLastNotification] = useState(null);
 *
 *       useEffect(
 *         () => {
 *           const subscription = onNotificationReceived(setLastNotification);
 *           return () => subscription.unsubscribe();
 *         },
 *         [setLastNotification]
 *       );
 *
 *       return <span>{lastNotification}<span>;
 *     };
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
