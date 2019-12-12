import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
var HtmlToReactParser = require("html-to-react").Parser;

const GroupItem = props => {
  var htmlToReactParser = new HtmlToReactParser();

  return (
    <>
      <Link to={"/groups/" + props.groupId} style={{ textDecoration: "none" }}>
        <div
          style={{
            height: "14vh",
            padding: "1%",
            paddingBottom: "3%",
            marginBottom: "5%",
            textDecoration: "none",
            borderRadius: "5px",
            backgroundColor: "#92E08D"
          }}
        >
          <h5
            style={{
              textDecoration: "none",
              color: "white",
              padding: 0,
              paddingBottom: "2%"
            }}
          >
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
