import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewGroupForm from "../../components/NewGroupForm";
import pusher from "../../utils/PusherObject";
import UserNotification from "./UserNotification";
import SENDER from "../../utils/SENDER";
import RequireAuth from "../../utils/HeadlessRequireAuth"
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand } from "@coreui/react";
import logo from "../../assets/img/brand/logo.PNG";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    var channel = pusher.subscribe("user_" + localStorage.getItem("id"));
    channel.bind("user_notification", this.updateNotifications);
  }

  state = {
    noOfNotis: 0,
    groups: [],
    notifications: [],
    propic: "",
  };

  updateNotifications = data => {
    this.setState(prevState => ({
      noOfNotis: prevState.noOfNotis + 1,
      notifications: [...prevState.notifications, JSON.parse(data)],
    }));
  };

  markNotificationAsSeen(id){
    SENDER.post("/notifications/"+id+"/seen").then(
      res => {
        this.setState(prevState => ({
          noOfNotis: prevState.noOfNotis ? prevState.noOfNotis - 1 : prevState.noOfNotis,
          notifications: prevState.notifications.filter( notification => notification.n_id !== id)
        }));
      }
    ).catch(err => alert(err))
  }

  async componentDidMount() {
    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    SENDER.get("/user/" + localStorage.getItem("id") + "/pro-pic").then(res => {
      this.setState({ propic: res.data });
    });

    SENDER.get("/user/" + localStorage.getItem("id") + "/u_notifications")
      .then(res => {
        this.setState({ notifications: res.data,noOfNotis: res.data.length })
      })
      .catch(err => console.log(err));
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 50, alt: "OnTask" }}
          href="/dashboard"
        />

        <Nav navbar style={{ height: "3vh" }}>
          <UncontrolledDropdown
            style={{
              display: this.state.groups.length > 0 ? "block" : "none",
              marginLeft: "5%",
            }}
          >
            <DropdownToggle caret nav direction="down">
              Groups
            </DropdownToggle>
            <DropdownMenu left="true">
              {this.state.groups.map(group => {
                return (
                  <DropdownItem key={group.groupId} style={{border: 0}}>
                    <a
                      href={"/groups/" + group.groupId}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {group.name}
                    </a>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="ml-auto" navbar style={{  }}>
          <NewGroupForm />
          <NavItem>
            <UncontrolledDropdown >
              <DropdownToggle nav direction="down">
                <i className="icon-bell" size="10" />
                <Badge pill color="danger" style={{display: this.state.noOfNotis ? "block" : "none" }}>
                  {this.state.noOfNotis}
                </Badge>
              </DropdownToggle>
              <DropdownMenu>
                {this.state.notifications.length > 0 ? this.state.notifications.map(notification => {
                  const n_id = notification.n_id ? notification.n_id : notification.id
                  return (
                    <UserNotification
                      id={notification.id || notification.n_id}
                      key={notification.id || notification.n_id}
                      markAsSeen={() =>this.markNotificationAsSeen(notification.id || notification.n_id)}
                      description={notification.description || notification.activity.description}
                      createdAt={notification.createdAt || notification.activity.createdAt}
                    />
                  );
                }) : <div style={{display: "flex",alignItems: "center",justifyContent: "center",height: "15vh",padding: "6%"}}>No New Notifications</div>}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.state.propic.propicURL ? (
                <img
                  src={this.state.propic.propicURL}
                  className="img-avatar"
                  width="30"
                  height="30"
                  alt=""
                />
              ) : (
                <img className="img-avatar" src={"https://www.gravatar.com/avatar/"+this.state.propic.emailHash+"?d=retro&s=50"} alt=""/>
              )}
            </DropdownToggle>
            <DropdownMenu style={{pasition: "absolute",top: 50,left: -130}}>
              <DropdownItem style={{border: "none"}}>
                <i className="fa fa-dashboard" />
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Dashboard
                </Link>{" "}
              </DropdownItem>
              <DropdownItem style={{border: "none"}}>
                <i className="fa fa-user" />
                <Link
                  to={"/users/" + localStorage.getItem("id")}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Link>{" "}
              </DropdownItem>
              <DropdownItem style={{border: "none"}} onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default RequireAuth(DefaultHeader);
