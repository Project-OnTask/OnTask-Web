import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, Input } from "reactstrap";
import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import MemberSearchItem from "../../../components/MemberSearchItem";
import SENDER from "../../../utils/SENDER";
import Clipboard from 'react-clipboard.js';
import InputGroup from "react-bootstrap/InputGroup";
import './group_invite.css'

class GroupInviteModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.textArea = React.createRef()
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      groupMembers: [],
      inviteLink: "",
      copySuccess: '',
      trig: true,
      message:
        "I'm working on this project on OnTask and I want to share it with you",
      searchResults: [],
    };
  }

  onCopySuccess = () => {
    alert("Copied to clipboard")
  }

  createInviteLink = () => {
    SENDER.post("/member/"+this.props.groupId+"/join",null,{
      params: {
        created_by: localStorage.getItem('id')
      }
    }).then(
      res => {
        console.log(res.data)
        this.setState({inviteLink: `http://localhost:3000/groups/${this.props.groupId}/?itoken=${res.data.id.itoken}`})
      }
    ).catch(err => console.log(err))
  }

sendInvitationToUsers = data => {
  SENDER.post("/member/"+this.props.groupId+"/join-email",{
    createdById: localStorage.getItem('id'),
    receiverId: data.userId,
    groupId: this.props.groupId
  }).then(
    res => {
      if(res.status === 200){
        const newSR = this.state.searchResults.filter(function(value, index, arr) {
          return value !== data;
        });
        this.setState({ searchResults: newSR });
        this.state.groupMembers.push(data);
        this.setState({ trig: !this.state.trig });
      }
    }
  ).catch(err => console.log(err))
}

  addMember = data => {
    SENDER.post('/members',{
      userId: data.userId,
      groupId: parseInt(this.props.groupId)},{
        params: {
          addedBy: localStorage.getItem('id')
        }
      }
   ).then( res => {
      if(res.status === 200){
        const newSR = this.state.searchResults.filter(function(value, index, arr) {
          return value !== data;
        });
        this.setState({ searchResults: newSR });
        this.state.groupMembers.push(data);
        this.setState({ trig: !this.state.trig });
      }
    })
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMemberSearch = e => {
    if (e.target.value) {
      SENDER.get("/users/search/"+this.props.groupId+"/" + e.target.value)
        .then(res => {
          let result = res.data;

          for (var i = 0, len = this.state.groupMembers.length; i < len; i++) {
            for (var j = 0, len2 = result.length; j < len2; j++) {
              if (this.state.groupMembers[i].userId === result[j].userId) {
                result.splice(j, 1);
                len2 = result.length;
              }
            }
          }
          this.setState({ searchResults: result });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ searchResults: [] });
    }
  };

  handleClose() {
    this.setState({
      show: false,
      groupMembers: [],
      inviteLink: "",
      copySuccess: '',
      trig: true,
      message:
        "I'm working on this project on OnTask and I want to share it with you",
      searchResults: [],
    })
    //this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button
          style={{
            marginLeft: "1%",
            backgroundColor: "green",
            color: "white",
            border: 0,
          }}
          onClick={this.handleShow}
        >
          Invite
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          {...this.props}
          size="lg"
          dialogClassName="group_invite_modal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Invite users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup style={{marginTop: "1%"}}>
              <Form.Control
                type="text"
                onChange={this.handleMemberSearch}
                placeholder="Search by mobile number or email address"
                aria-describedby="inputGroupPrepend"
              />
              <InputGroup.Append style={{ cursor: "pointer" }}>
                <InputGroup.Text id="inputGroupPrepend">
                  <SearchAlt2 size={20} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <div className="selected" style={{ paddingTop:  "1%" }}>
              {this.state.groupMembers ? (
                this.state.groupMembers.map(result => {
                  const lname = result.lname ? result.lname : "";
                  return (
                    <MemberSearchItem
                      key={result.userId}
                      id={result.userId}
                      data={result}
                      selected={true}
                      name={result.fname + "" + lname}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="search_results" style={{ paddingTop: this.state.searchResults.length > 0?"2%":0 }}>
              {this.state.searchResults.map(result => {
                const lname = result.lname ? result.lname : "";
                return (
                  <MemberSearchItem
                    key={result.userId}
                    id={result.userId}
                    data={result}
                    selectMember={this.sendInvitationToUsers}
                    name={result.fname + " " + lname}
                  />
                );
              })}
            </div>
            {/* <div style={{display: "flex",flexDirection: "row"}}>
            <Input
              as="textarea"
              defaultValue={this.state.message}
              inputRef={this.textArea}
              autoComplete="off"
              onChange={this.handleChange}
              name="message"
            />
            <Button color="success" style={{width: "30%",marginLeft: "2%"}}>Invite users</Button>
            </div> */}
            

            <h6 style={{marginTop: "3%"}}>Invite by link <span onClick={this.createInviteLink} style={{cursor: "pointer",color: "green"}}>Create link</span></h6>
            
    <div style={{display: "flex",flexDirection: "row"}}>
    <Input
              as="textarea"
              style={{width: "90%",marginRight: "1%"}}
              defaultValue={this.state.inviteLink}
              rows={6}
              onChange={this.handleChange}
              name="ilink"
            />
             <Clipboard style={{width: "30%"}} data-clipboard-text={this.state.inviteLink} onSuccess={this.onCopySuccess}>
        Copy Link
      </Clipboard>
    </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default GroupInviteModal;
