import React, { useState, useEffect } from "react";
import "./styles.css";
import { withRouter } from "react-router-dom"
import Axios from "axios";
import pusher from "../../../utils/PusherObject";

const QRDisplay = props => {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => { 

    Axios.get('/auth/get-ip').then(
      res => {
        setDeviceId(res.data.split(':').join(""))
        var channel = pusher.subscribe(res.data.split(':').join(""));
        channel.bind("login", logUserIn);
      }
    ).catch(err => console.log(err))

   }, []);

   function logUserIn(data){
     const d = JSON.parse(data)
     localStorage.removeItem('token')
     localStorage.removeItem('id')
     localStorage.setItem('id',d.userId)
     localStorage.setItem('token',d.token)
     props.history.push('/')
   }

  return (
    <div className="image">
      <img
        style={{ display: deviceId ? "block" : "none" }}
        src={Axios.defaults.baseURL + "/auth/get-qr/" + deviceId}
        alt="qr code"
        height="350"
        width="350"
      />
    </div>
  );
};

export default withRouter(QRDisplay);
