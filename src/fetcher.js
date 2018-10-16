const { API_HOST } = require("./constants");

// A container for holding the currently set `fetch` function.
const fetcher = {
  fetch: window.fetch && window.fetch.bind(window)
};

/**
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
export const skipPreflightChecks = () => {
  // Note that this only works on non-IE browsers (likely because `fetch`
  // doesn't work on the old ones).
  if (/Trident\/|MSIE /.test(window.navigator.userAgent)) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.onload = function () { /* eslint func-names: off */
    const { fetch } = this.contentWindow;

    // It's possible that the iframe will not have `fetch` defined if it's an
    // older browser (which would mean we had polyfilled in the main window but
    // not the iframe).
    if (fetch) {
      fetcher.fetch = fetch.bind(this.contentWindow);
    }
  };

  iframe.setAttribute("src", `${API_HOST}/proxy`);
  iframe.style.display = "none";

  document.domain = "culturehq.com";
  document.body.appendChild(iframe);
};

export default fetcher;
