import React, { useEffect, useState } from "react";
import SENDER from "../../utils/SENDER";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ReactMarkdown from "react-markdown";
import "./noticeviewer.css";

const NoticeViewer = props => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false);
    props.history.push("/groups/" + props.groupId);
  };

  useEffect(() => {
    if (props.id) {
      setShow(true);
    }
    SENDER.get("/notices/" + props.id)
      .then(res => {
        setContent(res.data.content);
        setTitle(res.data.title);
      })
      .catch(err => console.log(err));
  }, [props.id,props.i]);
  return (
    <Modal
      size="sm"
      show={show}
      onHide={closeModal}
      backdrop="static"
      dialogClassName="notice_viewer"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 200px)",
          height: "40vh",
          overflowY: "auto",
        }}
      >
        <ReactMarkdown
          source={content}
          style={{ textAlign: "justify", height: "30vh" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default withRouter(NoticeViewer);
