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
        tag="a"
        style={{
          padding: "1%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
        className="list-group-item-accent-warning"
      >
        {this.props.img ? (
          <img
            style={{ borderRadius: "50%" }}
            className="img-avatar"
            width="20"
            height="20"
            src={this.props.img}
            alt=""
          />
        ) : (
          <img
            className="img-avatar"
            width="20"
            height="20"
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
          href={"/users/" + this.props.id}
        >
          {this.props.name}
        </a>
        <div style={{ flexGrow: 1 }} />
        <UncontrolledDropdown
          direction="right"
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
                display: this.props.role === "member" ? "block" : "none",
              }}
            >
              Make admin
            </DropdownItem>
            <DropdownItem
              style={{
                display: this.props.role === "admin" ? "block" : "none",
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
