import React, { useState } from "react";
import useForm from "../../../utils/useForm";
import { Row, Col, Input, Form, FormGroup, Label } from "reactstrap";
import SENDER from "../../../utils/SENDER";

const styles = {
  header: { display: "flex", flexDirection: "row" },
  toggleFormText: { cursor: "pointer", color: "blue" },
  formFooterContainer: { display: "flex", flexDirection: "row", marginTop: "2%" },
  cancelBtn: {
    color: "red",
    cursor: "pointer",
    marginTop: "0.5%",
    marginRight: "0.5%",
  },
  submitBtn: { backgroundColor: "#12CD67", color: "white", width: "20%" }
};

const WorkSettings = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(addNewWorkPlace);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function handleIsWorking(event) {
    setIsWorking(event.target.checked);
  }

  function addNewWorkPlace() {
    let data = {};
    data.userId = parseInt(localStorage.getItem("id"));
    data.title = values.title;
    data.w_place = values.place;
    data.from = values.from;
    data.to = values.to;
    data.description = values.description;
    data.isWorking = isWorking;
    if (!isWorking && values.to === undefined) {
      alert("Please complete relevant fields");
    } else {
      SENDER.post("/user/work", data)
        .then(res => {
          setErrMsg("");
          setSuccessMsg("Updated successfully.");
        })
        .catch(err => {
          setSuccessMsg("");
          setErrMsg("An error occured. Please try again.");
          console.log(err);
        });
    }
  }

  return (
    <>
      <div style={styles.header}>
        <h5>Work</h5>
        <div style={{ flexGrow: 1 }} />
        <p
          style={styles.toggleFormText}
          onClick={() => setFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Hide Form" : "Add new workplace"}
        </p>
      </div>

      {/* The following are for displaying success and error messages */}
      <div style={{ display: successMsg || errMsg ? "block" : "none" }}>
        <p style={{ display: successMsg ? "block" : "none", color: "green" }}>
          {successMsg}
        </p>
        <p style={{ display: errMsg ? "block" : "none", color: "red" }}>
          {errMsg}
        </p>
      </div>

      {/* Form */}
      <Form
        style={{ display: isFormVisible ? "block" : "none" }}
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label for="exampleEmail">Title / Position</Label>
          <Input type="text" name="title" id="title" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Place</Label>
          <Input type="text" name="place" onChange={handleChange} />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">From</Label>
              <Input type="date" name="from" onChange={handleChange} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">To</Label>
              <Input type="date" name="to" onChange={handleChange} />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" onChange={handleChange} />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="isWorking"
              onChange={handleIsWorking}
            />{" "}
            Currently working here
          </Label>
        </FormGroup>
        <div style={styles.formFooterContainer}>
          <p
            onClick={() => setFormVisible(false)}
            style={styles.cancelBtn}
          >
            Cancel
          </p>
          <Input
            type="submit"
            style={styles.submitBtn}
          />
        </div>
      </Form>
    </>
  );
};

export default WorkSettings;
