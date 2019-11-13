import React, { Component } from "react";
import GroupSettings from "./GroupSettings";
import { withRouter } from "react-router-dom";
import SENDER from "../../../utils/SENDER";
import { Bin, Lock, Unlocked } from "styled-icons/icomoon";
import GroupInvite from "./GroupInvite";

class GroupHeader extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    btnTxt: "Invite",
    isPrivate: null
  };

  componentDidMount() {
    SENDER.get("/groups/" + this.props.groupId + "/status").then(res =>
      this.setState({ isPrivate: res.data })
    );
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      SENDER.get("/groups/" + this.props.groupId + "/status").then(res =>
        this.setState({ isPrivate: res.data })
      );
    }
  }

  changeGroupStatus = () => {
    SENDER.post("/groups/" + this.props.groupId + "/status", {
      status: !this.state.isPrivate,
      groupId: this.props.groupId,
      changedById: localStorage.getItem("id")
    }).then(res => this.setState({ isPrivate: !this.state.isPrivate }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        className="bg-success"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "white",
          margin: 0,
          marginLeft: "-0.5%",
          marginRight: "-5%",
          padding: "0.4%"
        }}
      >
        <h5>{this.props.name}</h5>
        <div style={{display: this.props.isAdmin  ? "block" : "none",marginLeft: "2%"}}>
        <GroupInvite groupId={this.props.groupId} />
        </div>
        {this.state.isPrivate && this.state.isPrivate !== null ? (
          <Lock
            size="25"
            style={{
              marginLeft: "3%",
              color: "white",
              cursor: this.props.isAdmin ? "pointer" : "default"
            }}
            onClick={this.props.isAdmin ? this.changeGroupStatus : () => {}}
          />
        ) : (
          <Unlocked
            size="25"
            style={{
              marginLeft: "3%",
              color: "white",
              cursor: this.props.isAdmin ? "pointer" : "default"
            }}
            onClick={this.props.isAdmin ? this.changeGroupStatus : () => {}}
          />
        )}
      </div>
    );
  }
}

export default withRouter(GroupHeader);
