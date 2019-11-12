import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Input } from 'reactstrap'
import Form from "react-bootstrap/Form";
import Button  from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import ReactMarkdown from 'react-markdown'
import Tabs from 'react-bootstrap/Tabs'
import SENDER from '../../../../utils/SENDER'

class NewNoticeForm extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          name: "",
          text: "",
          content: "",
          title: "",
          error: ""
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
      }

      handleContent = text => {
        console.log(text)
        this.setState({content: text})
      }
      
      handleSubmit = e => {
        e.preventDefault()
        this.setState({error: ""})
        if(this.state.title !== undefined && this.state.title.length>0){
          SENDER.post('/notices',{
            userId: localStorage.getItem('id'),
            groupId: this.props.groupId,
            title: this.state.title,
            content: this.state.content
          }).then(res => {
            if(res.status === 200){
              this.props.updateNoticeList()
              this.handleClose()
            }
          }).catch(err => {
            this.setState({error: "An error occured. Please try again"})
            console.log(err)
          })
        }  
      }
    
      render() {
        return (
          <>
            <i onClick={this.handleShow} style={{display: this.props.isAdmin ? "block" : "none",cursor: "pointer"}} className="fa fa-plus float-right"></i>
   
            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Announcement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p style={{textAlign: "center",color: "red"}}>{this.state.error}</p>
        <Input name="title" style={{marginBottom: "1%"}} placeholder="title" required onChange={this.handleChange}></Input>
        <Form.Group>
          <label></label>
          <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
          <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
          <Form.Control
            as="textarea"
            name="content"
            rows={6}
            onChange={this.handleChange}
          />
          </Tab>
          <Tab eventKey="preview" title="Preview" style={{height: "20vh"}}>
            <ReactMarkdown source={this.state.content} />
          </Tab>
        </Tabs>

          
        </Form.Group>
      
        </Modal.Body>
        <Modal.Footer>
          <p style={{color: "red",cursor: "pointer",marginTop: "4%"}} onClick={() => {this.setState({content: "",title: ""});this.handleClose()}}>Close</p>
          <Button variant="success" onClick={this.handleSubmit}>Create Announcement</Button>
        </Modal.Footer>
            </Modal>
          </>
        );
      }
  }

export default NewNoticeForm