import apiCalls from "./api-calls";
import { disconnect, subscribe } from "./cable";
import state from "./state";

const { createApiKey, createSimulation, deleteSession } = apiCalls;

/**
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
 */
export default apiCalls;

/**
 * == State ==
 *
 * Signed in state is handled through the client using the `signIn` and
 * `signOut` functions. These effectively act as normal API calls but with the
 * additional functionality of setting or clearing `localStorage` with the
 * returned API token.
 *
 * You can also manually set the API token by using the `setToken` named export.
 * This is especially useful if the token is fixed in some context (as in most
 * integrations).
 */
export const isSignedIn = state.isSignedIn;

export const setToken = state.setToken;

export const signIn = params => createApiKey(params).then(response => {
  state.setToken(response.apiKey.token);
  return response;
});

export const signOut = () => deleteSession().then(response => {
  state.clear();
  disconnect();
  return response;
});

/**
 * == Upload signing ==
 *
 * To support faster uploading, we allow images to be uploaded directly to S3,
 * and then just send along the signed URL to the API for fetching. This allows
 * API servers to continue processing requests instead of waiting for the upload
 * to complete.
 *
 * To use this mechanism, call this function with a file object and it will
 * return a Promise that resolves to the URL of the file that was uploaded, as
 * in the following example:
 *
 *     import { signUpload } from "@culturehq/client";
 *
 *     signUpload(document.querySelector("#file").files[0]).then(url => {
 *       console.log(url);
 *     });
 */
export { default as signUpload } from "./sign-upload";

/**
 * == Simulation ==
 *
 * If you're listed as a CultureHQ admin, you can simulate users for debugging
 * with read-only capabilities by using the `startUserSimulation` named export.
 * The corresponding end call is `endUserSimulation`, along with the check for
 * the current state which is `isSimulating`.
 */
export const isSimulating = state.isSimulating;

export const endUserSimulation = () => {
  state.clearSimulationToken();
  disconnect();
};

export const startUserSimulation = params => (
  createSimulation(params).then(response => {
    state.setSimulationToken(response.apiKey.token);
    disconnect();
    return response;
  })
);

/**
 * == Pagination ==
 *
 * Almost every one of the `list*` events is paginated, and will return
 * pagination metadata along with the actual data of the call. The `pagination`
 * object will look like:
 *
 *     { currentPage, totalPages, totalCount }
 *
 * You can handle this pagination manually, e.g., links on the bottom of the
 * page. You can also use the client's built-in automatic pagination
 * capabilities by using the `autoPaginate` named export, as in the following
 * example:
 *
 *     import { autoPaginate } from "@culturehq/client";
 *     const { events } = await autoPaginate("events").listEvents();
 *
 * This will return the pagination information as normal, but the events will
 * be concatenated together.
 */
export { default as autoPaginate } from "./auto-paginate";

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
