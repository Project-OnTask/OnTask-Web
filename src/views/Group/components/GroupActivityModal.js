import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import SENDER from "../../../utils/SENDER";
import GroupActivityItem from "../../../components/ActivityItem";
import pusher from "../../../utils/PusherObject";

export default function GroupActivityModal(props) {
  const [i,setI] = useState(0)
  const [show, setShow] = useState(false);
  const [groupActivities, setActivities] = useState([]);

  // This invokes when the Pusher channel gets a "new_activity" event
  const updateGroupActivityFeed = data => {
    setActivities([...groupActivities, JSON.parse(data)]);
  };

  useEffect(() => {
    // Subscribe to the relevant Pusher channel and listening for "new_activity" event.
    // Whenever this event occurs in the channel, group activity feed is gonna be updated
    var channel = pusher.subscribe("group_" + props.groupId);
    channel.bind("new_activity", updateGroupActivityFeed);

    SENDER.get("/groups/" + props.groupId + "/activity")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => console.log(err));
  },[i]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)  
   setI(i + 1);
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "100%", marginBottom: "2%" }}
      >
        View Group Activity
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Group Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {groupActivities.length > 0 ? (
            groupActivities
              .reverse()
              .map(activity => (
                <GroupActivityItem
                  description={activity.description.split("in group")[0].trim()}
                  key={activity.id}
                  createdAt={activity.createdAt}
                />
              ))
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
