import apiCalls from "./api-calls";

export default apiCalls;

export {
  getToken,
  isSignedIn,
  setToken,
  signIn,
  signOut
} from "./sign-in-state";

export { default as signUpload } from "./sign-upload";

export {
  isSimulating,
  endUserSimulation,
  startUserSimulation
} from "./simulation";

export { default as autoPaginate } from "./auto-paginate";

export {
  onEventStarting,
  onLeaderboardUpdated,
  onNotificationReceived,
  onRecognitionCreated,
  onUserActivityCreated
} from "./cable";

export { skipPreflightChecks } from "./fetcher";
