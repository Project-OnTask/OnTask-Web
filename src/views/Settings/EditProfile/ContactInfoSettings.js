import React, { useState } from "react";
import useForm from "../../../utils/useForm";
import SENDER from "../../../utils/SENDER";
import { Row, Col, Input, Button, Form } from "reactstrap";
import IntlTelInput from "react-bootstrap-intl-tel-input";

const styles = {
  column: {
    display: "flex",
    alignItems: "center",
  },
  label: { marginRight: "2%", marginTop: "2%" },
  cont: {
    display: "flex",
    height: "6vh",
    flexDirection: "row",
    width: "100%",
  }
};

const ContactInfoSettings = props => {
  const { values, handleChange, handleSubmit } = useForm(updateContactInfo);
  const [mobile, setMobile] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function updateContactInfo() {
    SENDER.post("/user/contact", {
      userId: localStorage.getItem("id"),
      mobile: mobile.replace(/-/g, ""),
      email: values.email,
    })
      .then(res => {
        setErrMsg("")
        setSuccessMsg("Contact info updated successfully.");
        props.onUpdate();
      })
      .catch(err => {
        setSuccessMsg("")
        setErrMsg("An error occured. Please try again.")
        console.log(err)
      });
  }

  return (
    <>
      <h5>Contact Info</h5>
      <div style={{display: successMsg || errMsg ? "block" : "none"}}>
        <p style={{display: successMsg ? "block" : "none",color: "green"}}>{successMsg}</p>
        <p style={{display: errMsg ? "block" : "none",color: "red"}}>{errMsg}</p>
      </div>
      <Form onSubmit={handleSubmit}>


              <label>mobile</label>
              <IntlTelInput
                preferredCountries={["LK"]}
                defaultCountry={"LK"}
                defaultValue={"+1 555-555-5555"}
                onChange={mobi => setMobile(mobi.intlPhoneNumber)}
              />
        
              <label style={{marginTop: "3%"}}>email</label>
              <Input
                name="email"
                placeholder=""
                type="email"
                onChange={handleChange}
              ></Input>
            
      
      
              <Button color="success" type="submit" style={{marginTop: "3%"}}>
                Update
              </Button>
      
      </Form>
    </>
  );
};

export default ContactInfoSettings;
