import client from "./apiCalls";

export default client;

export {
  getToken,
  isSignedIn,
  setToken,
  signIn,
  signOut
} from "./signInState";

export { default as signUpload } from "./signUpload";

export {
  isSimulating,
  endUserSimulation,
  startUserSimulation
} from "./simulation";

export {
  onEventStarting,
  onLeaderboardUpdated,
  onNotificationReceived,
  onRecognitionCreated,
  onUserActivityCreated
} from "./cable";

export { skipPreflightChecks } from "./fetcher";

export * from "./requests";

export { default as config, configure } from "./config";
