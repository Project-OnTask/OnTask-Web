import React from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment";
var HtmlToReactParser = require("html-to-react").Parser;

const GroupActivityItem = props => {
  var htmlToReactParser = new HtmlToReactParser();

  return (
    <div
      style={{
        margin: "1%",
        padding: "2%",
        paddingBottom: "6%",
        borderRadius: "6px",
        width: "100%",
        backgroundColor: "#CBD1D2",
      }}
    >
      <h6 style={{ margin: 0, fontSize: 14 }}>
        {htmlToReactParser.parse(props.description)}
      </h6>
      <p style={{ margin: 0 }}>{moment(new Date(props.createdAt)).fromNow()}</p>
    </div>
  );
};

export default GroupActivityItem;
