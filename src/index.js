import ActionCable from "actioncable";

import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";
import { camelize } from "./string-case";
import { startSwimming } from "./fishbowl";

const signInCallback = response => {
  state.signIn(response.apiKey.token);
  return response;
};

class CultureHQ {
  constructor(options = {}) {
    this.apiHost = options.apiHost;

    this.fishbowlHost = options.fishbowlHost;
    if (this.fishbowlHost) {
      startSwimming(this.fishbowlHost);
    }

    Object.keys(calls).forEach(callName => {
      this[callName] = apiCall(this, calls[callName]);
    });
  }

  endUserSimulation() {
    state.endSimulation();
  }

  isSignedIn() {
    return state.isSignedIn();
  }

  isSimulating() {
    return state.isSimulating();
  }

  /**
   * Builds and returns a subscription object that listens to profile updates
   * from the API. When new data is received, it transforms the data as it would
   * for regular responses and calls the callback.
   *
   * In order to avoid leaking memory, it's important to ensure that when you're
   * done with the subscription (for instance when the component containing it
   * is unmounted) that you call `unsubscribe` on the subscription object. An
   * example with React of using this function is below:
   *
   *     class MyComponent {
   *       state = { profile: this.props.profile };
   *
   *       componentDidMount() {
   *         this.subscription = client.onProfileUpdated(profile => {
   *           this.setState({ profile });
   *         });
   *       }
   *
   *       componentWillUnmount() {
   *         if (this.subscription) {
   *           this.subscription.unsubscribe();
   *         }
   *       }
   *     }
   */
  onProfileUpdated(callback) {
    this._ensureConsumer().subscriptions.create("ProfileChannel", {
      received: profile => callback(camelize(profile))
    });
  }

  setToken(token) {
    state.signIn(token);
  }

  signIn(params) {
    return this.createApiKey(params).then(signInCallback);
  }

  signOut() {
    state.signOut();
  }

  startUserSimulation(params) {
    return this.createSimulation(params).then(response => {
      state.startSimulation(response.apiKey.token);
      return response;
    });
  }

  _ensureConsumer() {
    if (this._consumer) {
      return this._consumer;
    }

    const [protocol, host] = this.apiHost.split("://");
    const wsProtocol = protocol === "https" ? "wss" : "ws";

    const endpoint = `${wsProtocol}://${host}/cable/${state.getToken()}`;
    this._consumer = ActionCable.createConsumer(endpoint);
    return this._consumer;
  }
}

export default CultureHQ;
