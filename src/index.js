import ActionCable from "actioncable";

import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";
import { camelize } from "./string-case";
import AutoPaginator from "./auto-paginator";

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
 * == Pagination ==
 *
 * Almost every one of the `list*` events is paginated, and will result
 * pagination metadata along with the actual data of the call. The `pagination`
 * object will look like:
 *
 *     { currentPage, totalPages, totalCount }
 *
 * You can handle this pagination manually, e.g., links on the bottom of the
 * page. Alternatively, you can use the client's built-in automatic pagination
 * capabilities. You prefix your API call with a call to `autoPaginate`, as in
 * the following example:
 *
 *     const { events } = await client.autoPaginate("events").listEvents();
 *
 * This will return the pagination information as normal, but the events will
 * be concatenated together.
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
    this.rejectedRequests = 0;
    this.apiHost = options.apiHost;

    Object.keys(calls).forEach(callName => {
      this[callName] = apiCall(this, calls[callName]);
    });
  }

  recordResponse(request, response) {
    if (response.status === 403) {
      this.rejectedRequests += 1;

      // After a 403 on the profile or 3 403s in a row, automatically sign out.
      if (request.url === `${this.apiHost}/profile` || this.rejectedRequests === 3) {
        return this.signOut().then(() => (this.rejectedRequests = 0));
      }
    } else {
      this.rejectedRequests = 0;
    }

    return Promise.resolve();
  }

  endUserSimulation() {
    state.endSimulation();
    this._disconnectConsumer();
  }

  isSignedIn() {
    return state.isSignedIn();
  }

  isSimulating() {
    return state.isSimulating();
  }

  onLeaderboardUpdated(callback) {
    return this._subscribeToChannel("LeaderboardChannel", callback);
  }

  onNotificationReceived(callback) {
    return this._subscribeToChannel("NotificationChannel", callback);
  }

  onRecognitionCreated(callback) {
    return this._subscribeToChannel("RecognitionChannel", callback);
  }

  onUserActivityCreated(callback) {
    return this._subscribeToChannel("UserActivityChannel", callback);
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
    return this.deleteSession().then(response => {
      state.signOut();
      this._disconnectConsumer();
      return response;
    });
  }

  startUserSimulation(params) {
    return this.createSimulation(params).then(response => {
      state.startSimulation(response.apiKey.token);
      this._disconnectConsumer();
      return response;
    });
  }

  autoPaginate(dataType) {
    return new AutoPaginator(this, dataType);
  }

  _disconnectConsumer() {
    if (this._consumer) {
      this._consumer.disconnect();
      this._consumer = null;
    }
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

  _subscribeToChannel(channel, callback) {
    return this._ensureConsumer().subscriptions.create(channel, {
      received: data => callback(camelize(data))
    });
  }
}

export default CultureHQ;
