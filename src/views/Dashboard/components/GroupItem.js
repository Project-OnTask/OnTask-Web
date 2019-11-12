import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
var HtmlToReactParser = require("html-to-react").Parser;

const GroupItem = props => {
  var htmlToReactParser = new HtmlToReactParser();

  return (
    <>
      <Link to={"/groups/" + props.groupId} style={{ textDecoration: "none" }}>
        <div style={{ paddingBottom: "3%", textDecoration: "none" }}>
          <h5 style={{ textDecoration: "none", color: "black", padding: 0 }}>
            {props.groupName}
          </h5>
          <span style={{ color: "gray" }}>
            {htmlToReactParser.parse(props.last_activity)}
          </span>
        </div>
      </Link>
    </>
  );
};

export default GroupItem;
