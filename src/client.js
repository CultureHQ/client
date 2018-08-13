import apiCalls from "./api-calls";
import { disconnect } from "./cable";
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
export const { getToken, isSignedIn, setToken } = state;

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
export const { isSimulating } = state;

export const endUserSimulation = () => {
  state.clearSimulationToken();
  disconnect();
};

export const startUserSimulation = params => {
  if (!state.isSignedIn()) {
    throw new Error("Cannot simulate unless you're already logged in.");
  }

  return createSimulation(params).then(response => {
    state.setSimulationToken(response.apiKey.token);
    disconnect();
    return response;
  });
};

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
export {
  onEventStarting,
  onLeaderboardUpdated,
  onNotificationReceived,
  onRecognitionCreated,
  onUserActivityCreated
} from "./cable";

/**
 * == Skipping preflight checks ==
 *
 * You can avoid all of the CORS preflight checks if the domains of both the
 * request and response match. You can accomplish this only if you're on a
 * subdomain and the server that you're trying to hit is on another subdomain of
 * the same parent domain.
 *
 * The way it works is by changing the `document.domain` value to be the common
 * parent domain of both the request and the response. The request can just be
 * changed by setting `document.domain` in the main window (this is allowed by
 * browsers because you're always allowed to set it to a suffix of the current
 * domain).
 *
 * The response domain can be changed by embedding an `iframe` into the page
 * that contains a specially crafted page from the response server. The `iframe`
 * contains a small HTML page with a script tag that changes the
 * `document.domain` value to match the requesting server. You can then pull the
 * `fetch` function from the child window into the parent and use that to hit
 * the server.
 *
 * So in this instance, since we're requesting things from `api.culturehq.com`
 * using `fetch` from `platform.culturehq.com`, we can embed an `iframe` using
 * the API's /proxy` endpoint which contains the code to change the
 * `document.domain` value to `culturehq.com`. We can then do the same in this
 * window and pull the `fetch` function from the child window.
 */
export { skipPreflightChecks } from "./fetcher";
