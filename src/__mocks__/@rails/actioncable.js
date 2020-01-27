/* eslint-disable max-classes-per-file */

class Subscriptions {
  constructor() {
    this.clear();
  }

  broadcast(channel, message) {
    this.getCallbacks(channel).forEach(callback => callback(message));
  }

  clear() {
    this.callbacks = {};
  }

  create(channel, { received }) {
    this.callbacks[channel] = [...this.getCallbacks(channel), received];
  }

  getCallbacks(channel) {
    return this.callbacks[channel] || [];
  }
}

class Consumer {
  constructor() {
    this.subscriptions = new Subscriptions();
  }

  disconnect() {
    this.subscriptions.clear();
  }

  broadcast(channel, message) {
    this.subscriptions.broadcast(channel, message);
  }
}

export const consumer = new Consumer();
export const createConsumer = () => consumer;
