import React, { Component } from "react"
import {Row,Col,Card,
  CardBody} from 'reactstrap'
import MobileLogin from './components/mobile'
import EmailLogin from './components/email'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends Component{
  constructor(props) {
    super(props);
    this.state={
      MailConfirmedText: ""
    } 
  }

  // This function is called when the Login page is loading. It checks if there is a 
  // logged in user. 
  componentDidMount(){
    axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    axios
    .get("/auth/user/me")
    .then(res => {
      // If available, user will be redirected to dashboard
      alert("You are already logged as "+res.data.fname + ". Try logout first")
      this.props.history.push("/")
    })
    .catch(err => {
      // else, user will continue to stay on the login page
      console.log("err: ", err);
    });

    // This is used when a user wants to verify their email address.
    // It checks for 'token' parameter in the URL 
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token')
    if(token){//if token is found, send the token to backend and update the DB
      axios
    .post("/auth/verify/email/"+token)
    .then(res => {
      console.log(res);
      this.setState({MailConfirmedText: "Email address was successfully verified"})
    })    
    .catch(err => {
      console.log("con err: ", err);
    });
    }
  }

  render(){
    return (
      <div style={{minHeight: "100vh",backgroundColor: "#1FDC75"}}>
       
      <Row style={{margin: 0}}>
          {/*<Col xs="12" sm="12" lg="9" className="p-2" style={{paddingRight: 0}}>
           <Card style={{height: "90vh",marginTop: "2.5%"}}>
                    <CardBody>
              {/* This component contains Qr code and instructions that
              are used to login with the mobile app. */}
                  {/*  <MobileLogin />
                    </CardBody>
                  </Card>
          </Col> */}
          <Col xs="12" sm="12" lg="4" className="p-2"></Col>
          <Col xs="12" sm="12" lg="4" className="p-2">
          <Card style={{height: "90vh",marginTop: "8%"}}>
          {/* This component contains a simple form to login with email for
          email users. */}
                    <CardBody style={{paddingTop: "18%"}}>
                    <EmailLogin history={this.props.history}/>
                    </CardBody>
                  </Card>
          </Col>
          </Row>
      </div>
  )
  }
}

export default withRouter(Login)