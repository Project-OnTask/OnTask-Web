import React, { useEffect, useState } from "react";
import SENDER from "../../utils/SENDER";
import { Clock } from "styled-icons/feather/Clock";
import { Github } from "styled-icons/boxicons-logos/Github";
import ProfilePicture from "../../components/ProfilePicture";
import { Link2 } from "styled-icons/feather/Link2";
import { ScLinkedin } from "styled-icons/evil/ScLinkedin";
import { Row, Col, Card, CardBody } from "reactstrap";
import EducationItem from "./components/EducationItem";
import WorkItem from "./components/WorkItem";
import moment from 'moment'
import ReactMarkdown from "react-markdown";

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
    icon: <Clock size={20}/>,
    type: "member_time",
  },
  {
    icon: <Github size={20}/>,
    type: "githubLink",
    tag: "a"
  },
  {
    icon: <Link2 size={20}/>,
    type: "websiteLink",
    tag: "a"
  },
  {
    icon: <ScLinkedin size={20}/>,
    type: "linkedinLink",
    tag: "a"
  },
];

const UserProfile = props => {
  const [userData, setUserData] = useState([]);
  const [lname, setLName] = useState("");
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);

  useEffect(() => {
    SENDER.get("/users/" + props.id).then(res => {
      res.data["member_time"] = moment(new Date(res.data.createdAt)).fromNow()
      setUserData(res.data);
      setLName(res.data.lname ? res.data.lname : "");
    });

    SENDER.get("/users/" + props.id + "/education").then(res => {
      setEducation(res.data);
    });

    SENDER.get("/users/" + props.id + "/work").then(res => {
      setWork(res.data);
    });
  }, [props.id,props.trigger]);
  return (
    <>
      <Row>
        <Col sm="6" md="3" xs="10" lg="3">
          <ProfilePicture id={props.id} />
        </Col>
        <Col sm="6" lg="5" className="middle_column">
          <h3>
            {(userData.fname ? userData.fname : "") +
              " " +
              (lname ? lname : " ")}
          </h3>
          {userData.bio ? (
            <ReactMarkdown source={userData.bio} />
          ) : localStorage.getItem("id") === props.id ? (
            <h6 style={{color: "gray"}}>
              Your <i>About me</i> is empty
            </h6>
          ) : (
            ""
          )}
        </Col>
        <Col sm="6" lg="4">
          <Card style={{ border: 0 }}>
            <CardBody
              style={{
                padding: 0,
                //paddingRight: "3%",
                paddingLeft: "3%",
//                display: userData.email ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              {links.map(link => {
                return (
                  <div
                    style={{
                      display: userData[link.type] ? "flex": "none",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "1.5%",
                    }}
                  >
                    {typeof link.icon === "string" ? (
                      <i className={link.icon} style={{ fontSize: "20px",color: "gray" }} />
                    ) : (
                      link.icon
                    )}

                    
                    {link.tag === "a" ? (<a href={userData[link.type]} rel="noopener noreferrer" target="_blank" style={{color: "black",margin: "0.5%", marginLeft: "1.5%"}}>
                      {userData[link.type]}
                    </a>) : <p style={{  margin: "0.5%", marginLeft: "1.5%" }}>
                      {userData[link.type]}
                    </p>}
                    
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "1%" }}>
        <Col sm="12" md="12" xs="12" lg="12">
          <Card style={{border: "none"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "4vh",
                alignItems: "center",
              }}
            >
              <i
                style={{ fontSize: 18,marginRight: "1%",color: "gray" }}
                className="fa fa-graduation-cap"
              ></i>
              <h4>Education</h4>
            </div>

            {education.length > 0 ? (
              education.map(EduItem => (
                <EducationItem
                  institute={EduItem.institute}
                  from={EduItem.startDate}
                  to={EduItem.endDate}
                  description={EduItem.description}
                />
              ))
            ) : (
              <Card
                style={{
                  display: "flex",
                  color: "gray",
                  justifyContent: "center",
                  height: "5vh",
                  margin: "1%",
                  marginLeft: "0%",
                  padding: "5%",
                  alignItems: "center",
                }}
              >
                <h6>No Education to show</h6>
              </Card>
            )}
          </Card>
        </Col>
        <Col sm="12" md="12" xs="12" lg="12">
        <Card style={{border: "none"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "4vh",
                paddingLeft: 0,
                alignItems: "center",
              }}
            >
              <i
                style={{ fontSize: 18,marginRight: "1%",color: "gray" }}
                className="fa fa-briefcase"
              ></i>
              <h4>Work</h4>
            </div>

            {work.length > 0 ? (
              work.map(WItem => (
                <WorkItem
                  title={WItem.title}
                  w_place={WItem.place}
                  from={WItem.startDate}
                  to={WItem.endDate}
                  description={WItem.description}
                />
              ))
            ) : (
              <Card
                style={{
                  display: "flex",
                  color: "gray",
                  justifyContent: "center",
                  height: "5vh",
                  padding: "5%",
                  margin: "1%",
                  marginLeft: 0,
                  alignItems: "center",
                }}
              >
                <h6>No Work to show</h6>
              </Card>
            )}
          </Card>

             </Col>
      </Row>
    </>
  );
};

export default UserProfile;
