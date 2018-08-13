import { createConsumer, consumer } from "actioncable";

import {
  onEventStarting,
  onLeaderboardUpdated,
  onNotificationReceived,
  onRecognitionCreated,
  onUserActivityCreated
} from "../src/client";

jest.mock("actioncable", () => {
  class Subscriptions {
    constructor() {
      this.clear();
    }

    broadcast(channel, message) {
      this.callbacks[channel].forEach(callback => callback(message));
    }

    clear() {
      this.callbacks = {};
    }

    create(channel, { received }) {
      this.callbacks[channel] = [...(this.callbacks[channel] || []), received];
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

  consumer.broadcast(channel, { "foo_bar": 1 });
  consumer.broadcast(channel, { "bar_baz": 2 });

  expect(updates).toEqual([{ "fooBar": 1 }, { "barBaz": 2 }]);
};

test("event starting", buildTest(onEventStarting, "EventStartingChannel"));

test("leaderboard updated", buildTest(onLeaderboardUpdated, "LeaderboardChannel"));

test("notification", buildTest(onNotificationReceived, "NotificationChannel"));

test("recognition created", buildTest(onRecognitionCreated, "RecognitionChannel"));

test("user activity created", buildTest(onUserActivityCreated, "UserActivityChannel"));
