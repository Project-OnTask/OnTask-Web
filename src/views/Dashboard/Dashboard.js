import React, { Component } from "react";
import RequireAuth from "../../utils/PrivateRoute";
import FeedItem from "./components/FeedItem";
import TaskItem from "../../components/TaskItem";
import pusher from "../../utils/PusherObject";
import SENDER from "../../utils/SENDER";
import TaskViewer from "../TaskViewer";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import { messaging } from "../../init-fcm";
import GroupItem from "./components/GroupItem";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      groups: [],
      assignedTasks: [],
      areTasksAssigned: true,
      feedItems: [],
      i:0,
      selectedTask: null,
    };
  }

  async componentDidMount() {
    messaging.requestPermission()
    .then(async function() {
const token = await messaging.getToken();
console.log("token: "+token)
localStorage.setItem("f_t",token)
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));



    SENDER.get("/user/" + localStorage.getItem("id") + "/d-tasks")
      .then(res => {
        const AssignedTasks = res.data.map(t => (
          {
            groupId: t.groupId,
            ...t.task
          }
        ))
        this.setState({ assignedTasks: AssignedTasks });
      })
      .catch(err => console.log(err));

    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => {
        this.setState({ groups: res.data });
        res.data.map((group, index) => {
          var channel = pusher.subscribe("group_" + group.groupId);
          channel.bind("new_activity", this.updateFeed);
        });
      })
      .catch(err => {
        console.log(err);
      });

    SENDER.get("/user/" + localStorage.getItem("id") + "/u_notifications")
      .then(res => {
        this.setState({ feedItems: res.data });
      })
      .catch(err => console.log(err));
  
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  updateFeed = data => {
    this.setState(prevState => ({
      feedItems: [...prevState.feedItems, JSON.parse(data)],
    }));
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  getClickedTask = (task,areTasksAssigned) => {
    console.log("pp: ",task.groupId)
    this.setState(prevState => {
      return { i: prevState.i+1,selectedTask: task }
    })
    
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="3" style={{ marginTop: "0.5%" }}>
            <h4 style={{  }}>My Tasks</h4>
            {this.state.assignedTasks.length > 0 ? (
              this.state.assignedTasks.map(item => {
                return (
                  <TaskItem
                    style={{
                      cursor: "pointer",

                      margin: 0,
                    }}
                    key={item.id}
                    isAssigned={true}
                    sendTask={this.getClickedTask}
                    task={item}
                  />
                );
              })
            ) : (
              <Card style={{ border: "none" }}>
                <CardBody>
                  <p
                    style={{
                      padding: "5%",
                      paddingLeft: 0,
                      color: "gray",
                      textAlign: "center",
                    }}
                  >
                    No tasks assigned
                  </p>
                </CardBody>
              </Card>
            )}
            <TaskViewer
              name={this.state.selectedTask ? this.state.selectedTask.name : ""}
              taskId={this.state.selectedTask ? this.state.selectedTask.id : ""}
              groupId={this.state.selectedTask && this.state.selectedTask.groupId}
              isAdmin={this.state.isAdmin}
              isAssigned={true}
              i={this.state.i}
            />
          </Col>

          <Col xs="12" sm="12" lg="5">
            <div
              className="bg-success"
              style={{
                paddingTop: "2%",
                paddingBottom: "0.5%",
                marginBottom: "1%",
              }}
            >
              <div style={{ marginLeft: "1%" }}>
                <h4>My Day</h4>
                <h6>{new Date().toJSON().slice(0, 10)}</h6>
              </div>
            </div>
            {this.state.feedItems.length > 0 ? (
              this.state.feedItems.map(feedItem => {
                return (
                  <Card style={{ marginBottom: 0,border: "none" }}                         key={feedItem.id}>
                    <CardBody style={{ padding: "0.5%", paddingBottom: "2%" }}>
                      <FeedItem
                        id={feedItem.id}
                        markAsSeen={() => {}}
                        description={
                          feedItem.description || feedItem.activity.description
                        }
                        createdAt={
                          feedItem.createdAt || feedItem.activity.createdAt
                        }
                      />
                    </CardBody>
                  </Card>
                );
              })
            ) : (
              <Card style={{ border: "none" }}>
                <CardBody>
                  <p
                    style={{
                      padding: "5%",
                      paddingLeft: 0,
                      color: "gray",
                      textAlign: "center",
                    }}
                  >
                    No recent activity
                  </p>
                </CardBody>
              </Card>
            )}
          </Col>
 
          <Col xs="12" sm="12" lg="4" style={{ marginTop: "0.5%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1%",
                alignItems: "center",
              }}
            >
              <h4>My Groups</h4>
              <div style={{ flexGrow: 1 }} />
              <Input
                style={{ width: "50%" }}
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option value="">Filter By</option>
                <option value="">Personal</option>
                <option value="">Public</option>
                <option value="">Private</option>
              </Input>
            </div>
            {this.state.groups.length > 0 ? (
              this.state.groups.map(group => {
                return (
                  <GroupItem
                    key={group.groupId}
                    groupId={group.groupId}
                    groupName={group.name}
                    last_activity={group.lastActivity}
                  />
                );
              })
            ) : (
              <Card style={{ padding: "1%", border: "none" }}>
                <CardBody style={{}}>
                  <p
                    style={{
                      padding: "4%",
                      paddingLeft: 0,
                      color: "gray",
                      textAlign: "center",
                    }}
                  >
                    No groups yet
                  </p>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequireAuth(Dashboard);
