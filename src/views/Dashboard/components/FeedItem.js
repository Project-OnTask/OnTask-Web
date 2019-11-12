import React from "react";
import moment from "moment";
var HtmlToReactParser = require("html-to-react").Parser;

const FeedItem = props => {
  var htmlToReactParser = new HtmlToReactParser();

  return (
    <div
      onClick={props.markAsSeen}
      style={{ height: "10vh", paddingBottom: "3%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1%",
          paddingLeft: 0
        }}
      >
        <h6 style={{ margin: 0, marginLeft: "0.5%" }}>
          {htmlToReactParser.parse(props.description)}
        </h6>
      </div>
      <p style={{ margin: 0, color: "gray" }}>
        {moment(new Date(props.createdAt)).fromNow()}
      </p>
    </div>
  );
};

export default FeedItem;
