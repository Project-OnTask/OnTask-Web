import React from "react";
import { Card, CardBody } from "reactstrap";

const WorkItem = props => {
  return (
    <Card style={{ marginBottom: "1%",border: "none",marginTop: "1%" }}>
      <CardBody style={{ padding: "1%",paddingLeft: 0 }}>
  <h5><span>{props.title}</span> {props.w_place ? "at":""} <span>{props.w_place}</span></h5>
        <p style={{color: "gray"}}>
          From <b>{props.from.slice(0, 10)}</b> -{" "}
          <b>{props.to ? props.to.slice(0, 10) : "Present"}</b>
        </p>

        <p>{props.description}</p>
      </CardBody>
    </Card>
  );
};

export default WorkItem;
