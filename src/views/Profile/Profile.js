import React, { Component } from "react";
import RequireAuth from "../../utils/PrivateRoute";
import SENDER from "../../utils/SENDER";
import moment from 'moment'
import ProfilePicture from "./components/ProfilePicture";
import UserProfile from "./UserProfile";
import { Clock } from "styled-icons/feather/Clock";
import { Github } from "styled-icons/boxicons-logos/Github";
import { Link2 } from "styled-icons/feather/Link2";
import { ScLinkedin } from "styled-icons/evil/ScLinkedin";
import ReactMarkdown from "react-markdown";
import { Col, Row } from "reactstrap";

const links = [
  {
    icon: "fa fa-envelope",
    type: "email",
  },
  {
    icon: "fa fa-phone",
    type: "mobile",
  },
  {
    icon: <Clock size={20} />,
    type: "member_time",
  },
  {
    icon: <Github size={20} />,
    type: "githubLink",
    tag: "a",
  },
  {
    icon: <Link2 size={20} />,
    type: "websiteLink",
    tag: "a",
  },
  {
    icon: <ScLinkedin size={20} />,
    type: "linkedinLink",
    tag: "a",
  },
];

class Profile extends Component {
  state = {
    userData: [],
    lname: "",
    education: [],
  };

  componentDidMount() {
    SENDER.get("/users/" + this.props.match.params.id).then(res => {
      res.data["member_time"] = moment(new Date(res.data.createdAt)).fromNow()
      this.setState({ userData: res.data });
    });

    this.setState({
      lname: this.state.userData.lname ? this.state.userData.lname : "",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      SENDER.get("/users/" + this.props.match.params.id).then(res => {
        this.setState({ userData: res.data });
      });

      this.setState({
        lname: this.state.userData.lname ? this.state.userData.lname : "",
      });
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  render() {
    return (
      <Row style={{ marginTop: "0.5%" }}>
        <Col xs="12" sm="12" lg="1" style={{paddingRight: 0}}></Col>  
        <Col
          xs="12"
          sm="12"
          lg="2"
          style={{
            paddingRight: 0,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div>
          <ProfilePicture id={this.props.match.params.id} />
          <div style={{marginBottom: "2%"}}>
          {this.state.userData.bio ? (
            <ReactMarkdown source={this.state.userData.bio} />
          ) : localStorage.getItem("id") === this.props.match.params.id ? (
            <h6 style={{color: "gray"}}>
              Your <i>About me</i> is empty
            </h6>
          ) : (
            ""
          )}
          </div>
          </div>
        </Col>
        <Col xs="12" sm="12" lg="1" style={{paddingRight: 0}}></Col>  
        <Col xs="12" sm="12" lg="7" style={{ paddingRight: 0 }}>
          <UserProfile id={this.props.match.params.id} />
          {/* <ProfilePane id={this.props.match.params.id}/> */}
        </Col>
      </Row>
    );
  }
}

export default RequireAuth(Profile);
