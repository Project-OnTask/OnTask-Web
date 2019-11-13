import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button } from "reactstrap";
import SENDER from "../../../utils/SENDER";
import useForm from "../../../utils/useForm";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";

const BasicInfoSettings = props => {
  const { values, handleChange, handleSubmit } = useForm(updateBasicInfo);
  const [userData,setUserData] = useState([])
  const [username, setUsername] = useState("");
  const [usernameDuplicateError, setUsernameDuplicateError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function updateBasicInfo() {
    let basicUserData = values;
    basicUserData["username"] = username ? username : null;
    SENDER.post(
      "/user/" + localStorage.getItem("id") + "/basic-info",
      basicUserData
    )
      .then(res => {
        props.onUpdate()
        setErrMsg("")
        setSuccessMsg("Updated successfully.");
      })
      .catch(err => {
        setSuccessMsg("")
        setErrMsg("An error occured. Please try again.")
        console.log(err)
      });
  }

  const validateUsername = e => {
    e.persist()
    SENDER.get("/users/exist/" + e.target.value)
      .then(res => {
        if (res.data) {
          setUsername(e.target.value);
          setUsernameDuplicateError("")
        } else {
          setUsernameDuplicateError("Username has already taken")
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    SENDER.get("/users/" + localStorage.getItem("id")).then(res => {
      setUserData(res.data)
      //values = res.data
    });
  }, [props.id]);

  return (
    <>
      <h5>Basic Info</h5>
      <div style={{display: successMsg || errMsg ? "block" : "none"}}>
        <p style={{display: successMsg ? "block" : "none",color: "green"}}>{successMsg}</p>
        <p style={{display: errMsg ? "block" : "none",color: "red"}}>{errMsg}</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            first name
            <Input
              name="fname"
              onChange={handleChange}
              defaultValue={values.fname}
              placeholder={userData.fname}
            />
          </Col>
          <Col>
            last name
            <Input
              name="lname"
              onChange={handleChange}
              defaultValue={values.lname}
              placeholder={userData.lname}
            />
          </Col>
        </Row>
        username
        <Input name="username" style={{width: "47%"}} onChange={validateUsername} placeholder={userData.username} />
        <p style={{color: "red"}}>{usernameDuplicateError}</p>
        About me
        <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
          <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
            <Input type="textarea" name="bio" onChange={handleChange} />
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <ReactMarkdown source={values.bio} />
          </Tab>
        </Tabs>
        <Button color="success" style={{ marginTop: "1%" }} type="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

export default BasicInfoSettings;
