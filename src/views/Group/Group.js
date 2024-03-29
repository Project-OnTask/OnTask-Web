import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";


import GroupTasks from "./components/GroupTasks";
import RequireAuth from "../../utils/PrivateRoute";
import ReactMarkdown from "react-markdown";
import GroupHeader from "./components/GroupHeader";
import SENDER from "../../utils/SENDER";
import GroupMembers from "./components/GroupMembers";
import NewNoticeForm from "./components/NewNoticeForm"
import GroupActivityModal from "./components/GroupActivityModal"
import NoticeViewer from "../../components/NoticeViewer/NoticeViewer";

class Group extends Component {
  constructor(props) {
    super(props);
    this.groupDesc = React.createRef();
  }

  state = {
    trig: false,
    i: 0,
    inviteLink: "",
    groupData: [],
    announcements: [],
    notices: [],
    groupActivities: [],
    completedTaskCount: 0,
    taskCount: 0,
    isAdmin: false,
    selectedNotice: null,
    percentage: 0,
    description: "",
    desEditable: false,
  };

  handleDescriptionChange = () => {
    this.setState({ desEditable: false });
    SENDER.post("/groups/" + this.props.match.params.gid + "/edit-desc", null, {
      params: {
        editedBy: localStorage.getItem("id"),
        desc: this.groupDesc.current.innerText,
      },
    })
      .then(res => {})
      .catch(err => alert("Error"));
  };

  componentDidMount() {
    //When page is loading, check if there's a group for given id.
    //If not, redirect to the dashboard
    SENDER.get("/exists/group/" + this.props.match.params.gid).then(res => {
      
    }).catch(err => {
      this.props.history.push('/')
    });

    //Check for invitation token in the URL parameters
    const params = new URLSearchParams(this.props.location.search);
    const itoken = params.get("itoken");

    // If token is present, member currently logged in is added to the group
    if (itoken) {
      SENDER.post("/member/" + itoken, null, {
        params: {
          user_id: localStorage.getItem("id"),
        },
      })
        .then(res => {
          alert("You have been added to group");
          this.setState(prevState => ({ trig: !prevState.trig }));
        })
        .catch(err => console.log(err));
    }
    
    //Get group name & description
    SENDER.get("/groups/" + this.props.match.params.gid)
      .then(res => {
        this.setState({
          groupData: res.data,
          description: res.data.description,
        });
      })
      .catch(err => console.log(err));

    //Fetching group activity
    SENDER.get("/groups/" + this.props.match.params.gid + "/activity")
      .then(res => {
        this.setState({ groupActivities: res.data });
      })
      .catch(err => console.log(err));

    //Check if currently logged in user is an admin of the group. Certain features
    //are enabled only if the user is an admin.
    SENDER.get(
      "/member/" +
        this.props.match.params.gid +
        "/is-admin/" +
        localStorage.getItem("id")
    )
      .then(res => {
        this.setState({ isAdmin: res.data });
      })
      .catch(err => console.log(err));

    //Fetching group announcements
    SENDER.get("/notices/group/" + this.props.match.params.gid)
      .then(res => {
        this.setState({ notices: res.data });
      })
      .catch(err => console.log(err));
  }

  // This invokes immediately after a new task is added. 
  updateTaskList = () => {
    SENDER.get("/" + this.props.match.params.gid + "/tasks")
      .then(res => {
        this.setState({ tasks: res.data, TaskCount: res.data.length });
      })
      .catch(err => console.log(err));
  };

  // This invokes immediately after a new announcement is added.
  updateNoticeList = () => {
    SENDER.get("/notices/group/" + this.props.match.params.gid)
      .then(res => {
        this.setState({ notices: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{}}>
        <GroupHeader
          name={this.state.groupData.name}
          groupId={this.props.match.params.gid}
          isAdmin={this.state.isAdmin}
        />
        <Row>
          {/* Task list of the group */}
          <Col xs="12" sm="12" lg="5" style={{ marginTop: "0.5%" }}>
            <GroupTasks
              groupId={this.props.match.params.gid}
              isAdmin={this.state.isAdmin}
              groupName={this.state.groupData.name}
            />
          </Col>

          {/* Group description, announcements. Only admins can edit group 
description and post announcements */}
          <Col xs="12" sm="6" lg="4" style={{ marginTop: "0.5%" }}>
            <GroupActivityModal groupId={this.props.match.params.gid}/>
            <Card
              style={{
                padding: "1%",
                marginBottom: 0,
                borderBottom: 0,
              }}
            >
              <CardHeader>
                <b>About</b>
                <div className="card-header-actions">
                  <i
                    className="fa fa-edit float-right"
                    onClick={() => this.setState({ desEditable: true })}
                    style={{
                      display: this.state.isAdmin ? "block" : "none",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ padding: "1%" }}>
                <div
                  ref={this.groupDesc}
                  contentEditable={this.state.desEditable}
                  style={{
                    border: this.state.desEditable ? "1px solid gray" : "none",
                    padding: this.state.desEditable ? "4%" : "2%",
                    textAlign: "justify",
                    borderRadius: "5px",
                  }}
                >
                  {this.state.description ? (
                    <ReactMarkdown source={this.state.description} />
                  ) : (
                    <p style={{ marginTop: "1%", color: "gray" }}>
                      No description provided
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    style={{
                      marginTop: "1%",
                      display: this.state.desEditable ? "block" : "none",
                    }}
                    onClick={this.handleDescriptionChange}
                    color="success"
                  >
                    update
                  </Button>
                  <p
                    style={{
                      margin: "3% 0% 0% 1%",
                      color: "red",
                      display: this.state.desEditable ? "block" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => this.setState({ desEditable: false })}
                  >
                    Cancel
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="card-accent-secondary" style={{borderTop: "none"}}>
              <CardHeader>
                <b>Announcements</b>
                <div className="card-header-actions">
                  <NewNoticeForm
                    groupId={this.props.match.params.gid}
                    isAdmin={this.state.isAdmin}
                    updateNoticeList={this.updateNoticeList}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ padding: 0 }}>          
                { this.state.notices.length > 0 ? this.state.notices.map(notice => {
                  return (
                    <Card
                      style={{ margin: 0, cursor: "pointer" }}
                      className="border-light"
                      onClick={() =>
                        this.setState({ selectedNotice: notice.id })
                      }
                      key={notice.id}
                    >
                      <CardBody
                        style={{
                          padding: "3% 0% 3% 2%",
                          flex: 1,
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <h6 style={{ margin: 0,marginBottom: "2%" }}>{notice.title}</h6>
                        <i className="fa fa-calendar" />{" "}
                        <b>{notice.date.slice(0, 10)}</b>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "5%" }}
                        />{" "}
                        <b>{notice.createdBy}</b>
                      </CardBody>
                    </Card>
                  );
                }) : <p style={{textAlign: "center",padding: "3%"}}>No announcements yet</p>}
                <NoticeViewer
                  id={
                    this.state.selectedNotice ? this.state.selectedNotice : ""
                  }
                  i={this.state.i}
                  groupId={this.props.match.params.gid}
                />
              </CardBody>
            </Card>
          </Col>

          {/* Group members, admins */}
          <Col xs="12" sm="6" lg="3" style={{ padding: 0 }}>
            <GroupMembers
              isAdmin={this.state.isAdmin}
              groupId={this.props.match.params.gid}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequireAuth(Group);
