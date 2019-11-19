import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BasicInfoSettings from "./EditProfile/BasicInfoSettings";
import WebPresenceSettings from "./EditProfile/WebPresenceSettings";
import ContactInfoSettings from "./EditProfile/ContactInfoSettings";
import WorkSettings from "./EditProfile/WorkSettings";
import EducationSettings from "./EditProfile/EducationSettings";
import AddOutlook from "./EditProfile/AddOutlook"
import './settings.css'

class ForgotPassword extends Component {
  render() {
    return (
      <Row>
        <Col sm={12} md={6}>
          <Card className="form_container">
            <CardBody>
              <h3 style={{marginTop: "-1%"}}>Settings</h3>
              <BasicInfoSettings
                id={localStorage.getItem("id")}
              />
            </CardBody>
          </Card>
          
          <Card className="form_container">
            <CardBody>
              <WorkSettings
                id={localStorage.getItem("id")}
              />
            </CardBody>
          </Card>

          <Card className="form_container">
            <CardBody>
              <EducationSettings
                id={localStorage.getItem("id")}
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6} style={{marginTop: "1%"}}>
          <Card className="form_container">
            <CardBody>
              <ContactInfoSettings  />
            </CardBody>
          </Card>

          <Card className="form_container">
            <CardBody>
              <WebPresenceSettings
                id={localStorage.getItem("id")}
              />
            </CardBody>
          </Card>

          <Card className="form_container">
            <CardBody>
              <AddOutlook />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ForgotPassword;
