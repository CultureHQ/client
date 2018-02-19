import ActionCable from "actioncable";

import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";
import { camelize } from "./string-case";
import { startSwimming } from "./fishbowl";

/**
 * A class for handling the connection to and querying of the CultureHQ API.
 * Mostly everything is represented in the `calls.json` file, as every call
 * listed in that file represents a member function on this class.
 *
 * == API call semantics ==
 *
 * Every API call function returns a `Promise` object. You can call them with
 * normal `Promise` semantics, as in below:
 *
 *     const getProfile = () => {
 *       cultureHQ.getProfile().then(response => {
 *         console.log(response);
 *       }).catch(error => {
 *         console.error(error);
 *       });
 *     };
 *
 * or you can use `async`/`await` syntax, as in below:
 *
 *     const getProfile = async () => {
 *       try {
 *         const response = await cultureHQ.getProfile();
 *         console.log(response);
 *       } catch (error) {
 *         console.error(error);
 *       }
 *     };
 *
 * == WebSocket connection semantics ==
 *
 * There are a few functions on the client that will establish a WebSocket
 * connection and call a callback function when data is received. For these
 * functions, in order to avoid leaking memory, it's important to ensure that 
 * when you're done with the subscription (for instance when the component
 * containing it is unmounted) that you call `unsubscribe` on the subscription
 * object. An example with React of using these functions is below:
 *
 *     class MyComponent {
 *       state = { notification: null };
 *
 *       componentDidMount() {
 *         this.subscription = client.onNotificationReceived(notification => {
 *           this.setState({ notification });
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

  onNotificationReceived(callback) {
    return this._subscribeToChannel("NotificationChannel");
  }

  onPointsIncremented(callback) {
    return this._subscribeToChannel("PointIncrementChannel");
  }

  setToken(token) {
    state.signIn(token);
  }

  signIn(params) {
    return this.createApiKey(params).then(response => {
      state.signIn(response.apiKey.token);
      return response;
    });
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

  _subscribeToChannel(channel) {
    return this._ensureConsumer().subscriptions.create(channel, {
      received: data => callback(camelize(data))
    });
  }
}

export default CultureHQ;
