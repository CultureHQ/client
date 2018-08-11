import API_CALLS from "./api-calls";
import AutoPaginator from "./auto-paginator";
import { disconnect, subscribe } from "./cable";
import state from "./state";
import signUpload from "./sign-upload";

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
 */
const client = {
  autoPaginate: dataType => new AutoPaginator(dataType),

  endUserSimulation: () => {
    state.endSimulation();
    disconnect();
  },

  isSignedIn: state.isSignedIn,

  isSimulating: state.isSimulating,

  setToken: state.setToken,

  signIn: params => client.createApiKey(params).then(response => {
    state.setToken(response.apiKey.token);
    return response;
  }),

  signOut: () => client.deleteSession().then(response => {
    state.clear();
    disconnect();
    return response;
  }),

  signUpload,

  startUserSimulation: params => client.createSimulation(params).then(response => {
    state.setSimulationToken(response.apiKey.token);
    disconnect();
    return response;
  }),

  ...API_CALLS
};

export default client;

/**
 * == WebSocket connection semantics ==
 *
 * There are a few functions on the client that will establish a WebSocket
 * connection and call a callback function when data is received. For these
 * functions, in order to avoid leaking memory, it's important to ensure that
 * when you're done with the subscription (for instance when the component
 * containing it is unmounted) that you call `unsubscribe` on the subscription
 * object. An example with React of using these functions is below:
 *
 *     import { onNotificationReceived } from "@culturehq/client";
 *
 *     class MyComponent {
 *       state = { lastNotification: null };
 *
 *       componentDidMount() {
 *         this.subscription = onNotificationReceived(notification => {
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
export const onEventStarting = subscribe("EventStartingChannel");

export const onLeaderboardUpdated = subscribe("LeaderboardChannel");

export const onNotificationReceived = subscribe("NotificationChannel");

export const onRecognitionCreated = subscribe("RecognitionChannel");

export const onUserActivityCreated = subscribe("UserActivityChannel");
