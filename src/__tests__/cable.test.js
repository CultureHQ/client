import { consumer } from "actioncable";

import {
  onEventStarting,
  onLeaderboardUpdated,
  onNotificationReceived,
  onRecognitionCreated,
  onUserActivityCreated
} from "../client";

import { disconnect } from "../cable";

jest.mock("actioncable", () => {
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

  const mockConsumer = {
    subscriptions: new Subscriptions(),
    disconnect: () => mockConsumer.subscriptions.clear(),
    broadcast: (channel, message) => mockConsumer.subscriptions.broadcast(channel, message)
  };

  return { consumer: mockConsumer, createConsumer: () => mockConsumer };
});

const buildTest = (onSubscribe, channel) => () => {
  const updates = [];
  onSubscribe(update => updates.push(update));

  consumer.broadcast(channel, { foo_bar: 1 });
  consumer.broadcast(channel, { bar_baz: 2 });

  expect(updates).toEqual([{ fooBar: 1 }, { barBaz: 2 }]);
};

test("when disconnected, does not broadcast", () => {
  const updates = [];
  onEventStarting(update => updates.push(update));

  consumer.broadcast("EventStartingChannel", 1);
  consumer.broadcast("EventStartingChannel", 2);

  disconnect();
  consumer.broadcast("EventStartingChannel", 3);

  expect(updates).toEqual([1, 2]);
});

test("event starting", buildTest(onEventStarting, "EventStartingChannel"));

test("leaderboard updated", buildTest(onLeaderboardUpdated, "LeaderboardChannel"));

test("notification", buildTest(onNotificationReceived, "NotificationChannel"));

test("recognition created", buildTest(onRecognitionCreated, "RecognitionChannel"));

test("user activity created", buildTest(onUserActivityCreated, "UserActivityChannel"));
