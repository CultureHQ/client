import ActionCable from "actioncable";

import { API_HOST } from "./constants";
import state from "./state";
import { camelize } from "./string-case";

const Cable = {
  consumer: null,

  disconnectConsumer: () => {
    if (Cable.consumer) {
      Cable.consumer.disconnect();
      Cable.consumer = null;
    }
  },

  ensureConsumer: () => {
    if (Cable.consumer) {
      return Cable.consumer;
    }

    const [protocol, host] = API_HOST.split("://");
    const wsProtocol = protocol === "https" ? "wss" : "ws";
    const endpoint = `${wsProtocol}://${host}/cable/${state.getToken()}`;

    Cable.consumer = ActionCable.createConsumer(endpoint);
    return Cable.consumer;
  },

  subscribeToChannel: (channel, callback) => Cable.ensureConsumer().subscriptions.create(channel, {
    received: data => callback(camelize(data))
  })
};

export default Cable;
