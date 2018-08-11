import ActionCable from "actioncable";

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
    consumer = ActionCable.createConsumer(getEndpoint());
  }
  return consumer;
};

export const disconnect = () => {
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
};

export const subscribe = channel => callback => (
  getConsumer().subscriptions.create(channel, {
    received: data => callback(camelize(data))
  })
);
