import React,{ useState,useEffect} from "react";
import { Row, Col, Card, CardBody, Input, Form, Button } from "reactstrap";
import SENDER from "../../utils/SENDER";
import useForm from "../../utils/useForm";

const WebPresenceSettings = props => {
  const { values, handleChange, handleSubmit } = useForm(updateWebPresence);
  const [userData,setUserData] = useState([])

  function updateWebPresence(e) {
    e.preventDefault()
    console.log(values);
    SENDER.post(
      "/user/" + localStorage.getItem('id') + "/web-presence",
      values
    )
      .then(res => {
        props.onUpdate()
        alert("Web presence updated");
      })
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    SENDER.get("/users/" + localStorage.getItem("id")).then(res => {
      console.log("User data: ");
      console.log(res.data);
      setUserData(res.data)
      //values = res.data
    });
  }, [props.id]);

  return (
    <>
      <h5>Web Presence</h5>

      <Form onSubmit={updateWebPresence}>
        website link
        <Input
          name="websiteLink"
          onChange={handleChange}
          placeholder={ userData.websiteLink ? userData.websiteLink:"Eg: http://example.com"}
        ></Input>
        twitter link
        <Input
          name="twitterLink"
          onChange={handleChange}
          placeholder={userData.twitterLink ?  userData.twitterLink : "Eg: https://twitter.com/username"}
        ></Input>
        Stackoverflow link
        <Input
          name="stackOverflowLink"
          onChange={handleChange}
          placeholder={userData.stackOverflowLink ? userData.stackOverflowLink :"Eg: https://stackoverflow.com/users/123456/username"}
        ></Input>
        Github
        <Input
          name="githubLink"
          onChange={handleChange}
          placeholder={userData.githubLink ?  userData.githubLink : "Eg: https://github.com/userame"}
        ></Input>
                Linkedin
        <Input
          name="linkedInLink"
          onChange={handleChange}
          placeholder={userData.linkedInLink ? userData.linkedInLink : "Eg: https://www.linkedin.com/in/username/"}
        ></Input>
        <Button color="success" style={{ marginTop: "1%" }} type="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

export default WebPresenceSettings;
