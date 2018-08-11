const { API_HOST } = require("./constants");

// A container for holding the currently set `fetch` function.
const fetcher = { fetch: window.fetch };

// If we're in production, build an iframe using the /proxy endpoint from the
// API that contains the JS `document.domain = "culturehq.com"`. Then, set this
// window's domain to match and load the iframe. This allows us to avoid
// preflight checks on CORS requests.
//
// Note this works since you're allowed to set `document.domain` to any suffix
// of the current domain (in this case we're modifying both `api.culturehq.com`
// and `platform.culturehq.com`).
//
// Note that this only really works on non-IE browsers (likely because `fetch`
// doesn't work on the old ones).
if (process.env.NODE_ENV === "production" && !/Trident\/|MSIE /.test(window.navigator.userAgent)) {
  const iframe = document.createElement("iframe");
  iframe.onload = function () { /* eslint func-names: off */
    fetcher.fetch = this.contentWindow.fetch;
  };

  iframe.setAttribute("src", `${API_HOST}/proxy`);
  iframe.style.display = "none";

  document.domain = "culturehq.com";
  document.body.appendChild(iframe);
}

export default fetcher;
