import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import SENDER from "../../../utils/SENDER";
import { Input, Button } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";

const CommentBox = props => {
  const [input, setInput] = useState("");
  const [isSubmitting, setSubmitStatus] = useState(false);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function postComment(event) {
    event.preventDefault();
    props.setError("");
    setSubmitStatus(true);
    SENDER.post("/comments", {
      taskId: props.taskId,
      content: input,
      userId: parseInt(localStorage.getItem("id")),
    })
      .then(res => {
        if (res.status === 200) {
          setInput("")
          setSubmitStatus(false);
        }
      })
      .catch(err => {
        props.setError("");
        setSubmitStatus(false);
        console.log("Comment Error : " + err);
      });
  }

  return (
    <>
      <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
        <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
          <Input
            type="textarea"
            name="input"
            value={input}
            onChange={handleChange}
          />
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <ReactMarkdown source={input} />
        </Tab>
      </Tabs>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ flexGrow: 1 }} />
        <Button
          color="success"
          onClick={postComment}
          disabled={isSubmitting}
          style={{ marginTop: "1%", float: "right" }}
        >
          {isSubmitting ? "Posting.." : "Comment"}
        </Button>
      </div>
    </>
  );
};

export default CommentBox;
