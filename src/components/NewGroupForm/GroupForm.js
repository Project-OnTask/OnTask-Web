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
  const [searchResults, setSearchResults] = useState([]);

  const handleMemberSearch = e => {
    if (e.target.value) {
      SENDER.get("/user/search/" + e.target.value)
        .then(res => {
          let result = res.data;

          for (var i = 0, len = groupMembers.length; i < len; i++) {
            for (var j = 0, len2 = result.length; j < len2; j++) {
              if (groupMembers[i].userId === result[j].userId) {
                result.splice(j, 1);
                len2 = result.length;
              }
            }
          }

          console.log(result);
          setSearchResults(result);
        })
        .catch(err => console.log(err));
    } else {
      setSearchResults([]);
    }
  };

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
