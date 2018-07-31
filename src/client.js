import ActionCable from "actioncable";

import API_CALLS from "./api-calls";
import AutoPaginator from "./auto-paginator";
import { API_HOST } from "./constants";
import state from "./state";
import signUpload from "./sign-upload";
import { camelize } from "./string-case";

/**
 * An object for handling the connection to and querying of the CultureHQ API.
 * Mostly everything is represented in the `calls.json` file, as every call
 * listed in that file represents a member function on this class.
 *
 * == API call semantics ==
 *
 * Every API call function returns a `Promise` object. You can call them with
 * normal `Promise` semantics, as in below:
 *
 *     const getProfile = () => {
 *       client.getProfile().then(response => {
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
 *         const response = await client.getProfile();
 *         console.log(response);
 *       } catch (error) {
 *         console.error(error);
 *       }
 *     };
 *
 * == Pagination ==
 *
 * Almost every one of the `list*` events is paginated, and will return
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
 *       state = { lastNotification: null };
 *
 *       componentDidMount() {
 *         this.subscription = client.onNotificationReceived(notification => {
 *           this.setState({ lastNotification: notification });
 *         });
 *       }
 *
 *       componentWillUnmount() {
 *         if (this.subscription) {
 *           this.subscription.unsubscribe();
 *         }
 *       }
 *
 *       render() {
 *         const { lastNotification } = this.state;
 *
 *         return <span>{lastNotification}<span>;
 *       }
 *     }
 */
const client = {
  consumer: null,

  endUserSimulation: () => {
    state.endSimulation();
    client.disconnectConsumer();
  },

  isSignedIn: () => state.isSignedIn(),

  isSimulating: () => state.isSimulating(),

  onLeaderboardUpdated: callback => (
    client.subscribeToChannel("LeaderboardChannel", callback)
  ),

  onNotificationReceived: callback => (
    client.subscribeToChannel("NotificationChannel", callback)
  ),

  onRecognitionCreated: callback => (
    client.subscribeToChannel("RecognitionChannel", callback)
  ),

  onUserActivityCreated: callback => (
    client.subscribeToChannel("UserActivityChannel", callback)
  ),

  setToken: token => state.signIn(token),

  signIn: params => client.createApiKey(params).then(response => {
    state.signIn(response.apiKey.token);
    return response;
  }),

  signOut: () => client.deleteSession().then(response => {
    state.signOut();
    client.disconnectConsumer();
    return response;
  }),

  signUpload,

  startUserSimulation: params => client.createSimulation(params).then(response => {
    state.startSimulation(response.apiKey.token);
    client.disconnectConsumer();
    return response;
  }),

  autoPaginate: dataType => new AutoPaginator(dataType),

  disconnectConsumer: () => {
    if (client.consumer) {
      client.consumer.disconnect();
      client.consumer = null;
    }
  },

  ensureConsumer: () => {
    if (client.consumer) {
      return client.consumer;
    }

    const [protocol, host] = API_HOST.split("://");
    const wsProtocol = protocol === "https" ? "wss" : "ws";
    const endpoint = `${wsProtocol}://${host}/cable/${state.getToken()}`;

    client.consumer = ActionCable.createConsumer(endpoint);
    return client.consumer;
  },

  subscribeToChannel: (channel, callback) => client.ensureConsumer().subscriptions.create(channel, {
    received: data => callback(camelize(data))
  }),

  ...API_CALLS
};

export default client;
