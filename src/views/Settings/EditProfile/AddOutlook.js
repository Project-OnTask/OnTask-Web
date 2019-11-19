import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import SENDER from "../../../utils/SENDER";

const outlook_auth_url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
client_id=${process.env.REACT_APP_OUTLOOK_APP_ID}
&response_type=code
&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foutlook
&response_mode=query
&scope=offline_access%20user.read%20Calendars.ReadWrite
&state=12345`;

const AddOutlook = () => {
  const [isOutlookConnected,setOutlookConnected] = useState(false)
  const connectOutlook = () => {
    window.open(outlook_auth_url);
  };

  useEffect(
      () => {
        SENDER.get('/users/'+localStorage.getItem('id')+'/outlook').then(res => {
            if(res.data){
                setOutlookConnected(true)
            }
        })
      },[]
  )

  return (
    <>
      <h5>Connect Outlook Calendar</h5>

      <Button
        onClick={connectOutlook}
        color="success"
        style={{ marginTop: "2%" }}
  >{isOutlookConnected ? "Connected to Outlook" : "Connect Outlook"}</Button>
    </>
  );
};

export default AddOutlook;
