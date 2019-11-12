import React, { Component } from "react";
import { Button, ListGroupItem } from "reactstrap";

class MemberSearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: false,
        isDisabled: false
    }
  }

  render() {
    return (
        <>
        <ListGroupItem
          action
          style={{
            padding: "0.5%",
            border: 0,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          className="list-group-item-accent-warning"
        >
          <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        height: "5vh",
        paddingBottom: "2%"
      }}
      onClick={() => this.props.history.push("/users/" + this.props.id)}
      >
        {
            this.props.data.propicURL ? 
            <img
            style={{ borderRadius: "50%",marginRight: "2%" }}
            className="img-avatar"
            width="25"
            height="25"
            src={this.props.data.propicURL}
            alt=""
          /> :
          <img style={{ marginRight: "4%" }} className="img-avatar" src={"https://www.gravatar.com/avatar/"+this.props.data.emailHash+"?d=retro&s=25"} alt=""/>
          }
          <div style={{ marginLeft: "1%" }}>{this.props.name} </div>
      </div>
      <div style={{ flexGrow: 1 }} />
         {this.props.selected ? "" : <Button
            color="success"
            disabled={this.state.isDisabled}
            onClick={() => {
              this.setState({isDisabled: true})
              this.props.selectMember(this.props.data)
            }}
            style={{marginLeft: "1%"}}
          >
            Add
          </Button>} 
        </ListGroupItem> 
      </>
    );
  }
}

export default MemberSearchItem;
