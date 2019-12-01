import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../../utils/useForm";
import { withRouter } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";
import SENDER from "../../utils/SENDER";


const GroupForm = props => {
  const { values, handleChange, handleSubmit } = useForm(createNewGroup);
  const groupMembers = [];
  const [trig, setTrig] = useState(true);
  const [isSubmitting, setSubmitStatus] = useState(false);
  const [Error, setError] = useState("");
  const [isPrivate,setPrivacy] = useState(false)

  function createNewGroup(e) {
    e.preventDefault();
    setSubmitStatus(true);
    if (!values.name || !values.description) {
      setError("Relevant fields are empty.");
      setSubmitStatus(false);
    } else {
      setError("")
      SENDER.post("/groups", {
        userId: localStorage.getItem("id"),
        name: values.name,
        description: values.description,
        isPrivate: isPrivate,
        members: groupMembers.map(member => member.userId),
      })
        .then(res => {
          if (res.status === 200) {
            setSubmitStatus(false);
            props.handleClose();
            props.history.push("/groups/" + res.data);
            window.location.reload();
          }
        })
        .catch(err => {
          alert("There was an error.Please try again");
          setSubmitStatus(false);
          console.log(err);
        });
    }
  }

  const handleKeyDown = event => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
    }
  };

  const handlePrivacy = e => {
    e.stopPropagation();
    setPrivacy(e.target.checked);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={e => {
          handleKeyDown(e);
        }}
      >
        <div style={{textAlign: "center",color: "red"}}>{Error}</div>
        <Form.Group>
          <label>Name <span style={{color: "red"}}>*</span></label>
          <Form.Control required name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <label>Description <span style={{color: "red"}}>*</span></label>
          <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
          <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
          <Form.Control
            as="textarea"
            required
            name="description"
            rows={6}
            onChange={handleChange}
          />
          </Tab>
          <Tab eventKey="preview" title="Preview" style={{height: "20vh"}}>
            <ReactMarkdown source={values.description} />
          </Tab>
        </Tabs>

          
        </Form.Group>

        <Form.Group style={{marginTop: "5%"}}>
          <Form.Check
            type="checkbox"
            onChange={handlePrivacy}
            label={
              <p style={{ marginBottom: 0 }}>
                This group is private
              </p>
            }
          />
        </Form.Group>

      </Form>

      <Modal.Footer>
        {/* eslint-disable-next-line */}
        <a
         // href=""
          style={{ textDecoration: "none",cursor: "pointer", color: "red" }}
          onClick={props.handleClose}
        >
          Cancel
        </a>
        <Button
          variant="success"
          disabled={isSubmitting}
          onClick={createNewGroup}
        >
          {isSubmitting ? "Creating.." : "Create Group"}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default withRouter(GroupForm);
