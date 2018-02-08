import "isomorphic-fetch";

const fishbowl = {
  queue: [],
  started: false
};

const swim = ({ method, url, options }) => {
  if (!fishbowl.started) {
    return;
  }
  fishbowl.queue.push(`${method} ${url.toString()} ${JSON.stringify(options)}`);
};

const startSwimming = fishbowlHost => {
  fishbowl.started = true;
  const url = `${fishbowlHost}/events`;

  setInterval(() => {
    let body = fishbowl.queue.shift();
    if (body) {
      fetch(url, { method: "POST", body, mode: "no-cors" });
    }
  }, 250);
};

export { swim, startSwimming };
