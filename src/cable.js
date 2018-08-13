import { createConsumer } from "actioncable";

import { API_HOST } from "./constants";
import state from "./state";
import { camelize } from "./string-case";

let consumer = null;

const getEndpoint = () => {
  const [protocol, host] = API_HOST.split("://");
  const wsProtocol = protocol === "https" ? "wss" : "ws";
  return `${wsProtocol}://${host}/cable/${state.getToken()}`;
};

const getConsumer = () => {
  if (!consumer) {
    consumer = createConsumer(getEndpoint());
  }
  return consumer;
};

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
