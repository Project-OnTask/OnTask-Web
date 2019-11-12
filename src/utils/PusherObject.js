import Pusher from "pusher-js";

Pusher.logToConsole = process.env.REACT_APP_NODE_ENV === "production" ? false : true;

var pusher = new Pusher("1f56dbce61dcd7d6da58", {
  cluster: "ap2",
  encrypted: true,
});

export default pusher;
