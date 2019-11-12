import React, { useState, useEffect } from "react";
import QR from "../../../assets/img/qr.png";
import "./styles.css";
import Axios from "axios";

const QRDisplay = () => {
    const [deviceId,setDeviceId] = useState("")

  useEffect(() => {
    setDeviceId("pppppppppppppppppp")
  }, []);

  return (
    <div className="image">
      <img
      style={{display: deviceId ? "block" : "none"}}
        src={
          Axios.defaults.baseURL +
          "/auth/mobile/signin/" + deviceId
        }
        alt="qr code"
        height="400"
        width="400"
      />
    </div>
  );
};

export default QRDisplay;
