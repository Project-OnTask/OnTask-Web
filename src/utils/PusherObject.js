import Pusher from "pusher-js";

Pusher.logToConsole = process.env.REACT_APP_NODE_ENV === "production" ? false : true;

var pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, {
  cluster: "ap2",
  encrypted: true,
});

export default pusher;
