import "isomorphic-fetch";

const fishbowl = {
  queue: [],
  started: false,
  interval: null
};

const swim = message => {
  if (fishbowl.started) {
    fishbowl.queue.push(message);
  }
};

const startSwimming = fishbowlHost => {
  const url = `${fishbowlHost}/events`;
  fishbowl.started = true;

  fishbowl.interval = setInterval(() => {
    let body = fishbowl.queue.shift();
    if (body) {
      fetch(url, { method: "POST", body, mode: "no-cors" }).catch(() => {
        fishbowl.started = false;
        clearInterval(fishbowl.interval);
      });
    }
  }, 200);
};

export { swim, startSwimming };
