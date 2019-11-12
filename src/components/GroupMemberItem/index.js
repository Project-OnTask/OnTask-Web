import React, { Component } from "react";
import SENDER from '../../utils/SENDER'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { ListGroupItem } from "reactstrap";

class GroupMemberItem extends Component {
  makeMemberAdmin = () => {
      SENDER.post("/member/admin",{
          addedById: localStorage.getItem('id'),
          groupId: this.props.groupId, 
          userId: this.props.userId
      }).then(res => alert("abc")).catch(err => console.log(err))
  };

  removeFromAdmin = () => {
    SENDER.post("/member/member",{
        addedById: localStorage.getItem('id'),
        groupId: this.props.groupId, 
        userId: this.props.userId
    }).then(res => alert("abc")).catch(err => console.log(err))
  }

  removeFromGroup = () => {}

  render() {
    return (
      <ListGroupItem
        action
        style={{
          padding: "2%",
          alignItems: "center",
          display: "flex",
          border: "none",
          flexDirection: "row",
        }}
      >
        {this.props.img ? (
          <img
            style={{ borderRadius: "50%" }}
            className="img-avatar"
            width="30"
            height="30"
            src={this.props.img}
            alt=""
          />
        ) : (
          <img
            className="img-avatar"
            width="30"
            height="30"
            src={
              "https://www.gravatar.com/avatar/" +
              this.props.emailHash +
              "?d=retro&s=25"
            }
            alt=""
          />
        )}
        <a
          style={{ marginLeft: "1%", textDecoration: "none", color: "black" }}
          href={"/users/" + this.props.userId}
        >
          {this.props.name}
        </a>
        <div style={{ flexGrow: 1 }} />
        <UncontrolledDropdown
          direction="down"
          style={{
            display: this.props.isAdmin ? "block" : "none",
            marginTop: "-1.5%",
          }}
        >
          <DropdownToggle nav>
            <i className="fa fa-ellipsis-h" size={5}></i>
          </DropdownToggle>
          <DropdownMenu left="true">
            <DropdownItem
              onClick={this.makeMemberAdmin}
              style={{
                display: this.props.m_role === "member" ? "block" : "none",
                border: 0
              }}
            >
              Make admin
            </DropdownItem>
            <DropdownItem
              style={{
                display: this.props.m_role === "admin" ? "block" : "none",
                border: 0
              }}
              onClick={this.removeFromAdmin}
            >
              Remove admin
            </DropdownItem>
            <DropdownItem onClick={this.removeFromGroup}>Remove from group</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListGroupItem>
    );
  }
}

export default GroupMemberItem;
