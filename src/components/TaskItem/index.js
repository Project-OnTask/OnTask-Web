import React from "react";
import { Card, CardBody } from "reactstrap";

const TaskItem = props => {
  const OnClick =
    props.isAssigned || props.isAdmin
      ? () => props.sendTask(props.task, true)
      : () => {};

  return (
    <Card className="mb-sm-2" style={{ backgroundColor: "", border: "none" }}>
      <CardBody style={{ padding: 0, paddingTop: "2%" }}>
        <div
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={OnClick}
        >
          <h5 style={{color: props.isCompleted ? "green" : ""}}>{props.task.name}</h5>
          <p style={{ margin: 0 }}>
            due <b>{props.task.dueDate}</b>
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}></div>
      </CardBody>
    </Card>
  );
};

export default TaskItem;
