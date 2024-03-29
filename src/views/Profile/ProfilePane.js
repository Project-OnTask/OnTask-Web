import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PropTypes from "prop-types";
import UserProfile from "./UserProfile";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ProfilePane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trigger: false,
      editEnabled: false,
      key: "profile",
    };
  }

  componentDidMount() {
    if (this.props.id === localStorage.getItem("id")) {
      this.setState({ editEnabled: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps !== this.props &&
      this.props.id === localStorage.getItem("id")
    ) {
      this.setState({ editEnabled: true });
    }
  }

  triggerUpdate = () => {
    this.setState(prevState => {
      this.setState({ trigger: !prevState.trigger });
    });
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <Card style={{ padding: "1%",border: "none" }}>
        <CardBody style={{ padding: 0 }}>
          <Tabs
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={k => this.setState({ key: k })}
          >
            <Tab eventKey="profile" title="Profile">
              <UserProfile id={this.props.id} trigger={this.state.trigger} />
            </Tab>
            <Tab
              eventKey="edit"
              disabled={!this.state.editEnabled}
              title={this.state.editEnabled ? "Edit profile & settings" : ""}
              style={{ display: this.state.editEnabled ? "block" : "none" }}
            >
             
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    );
  }
}

ProfilePane.propTypes = propTypes;
ProfilePane.defaultProps = defaultProps;

export default ProfilePane;
