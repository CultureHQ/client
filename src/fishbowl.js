import "isomorphic-fetch";

const fishbowl = {
  queue: [],
  started: false
};

const swim = message => {
  if (fishbowl.started) {
    fishbowl.queue.push(message);
  }
};

const startSwimming = fishbowlHost => {
  fishbowl.started = true;
  const url = `${fishbowlHost}/events`;

  setInterval(() => {
    let body = fishbowl.queue.shift();
    if (body) {
      fetch(url, { method: "POST", body, mode: "no-cors" });
    }
  }, 200);
};

export { swim, startSwimming };
