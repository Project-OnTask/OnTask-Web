import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmailForm from "./EmailForm";
import axios from "axios";

const styles = {
  header: {
    display: "flex",
    justifyContent: "left",
  },
  emailSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: "10px",
    margin: "10px",
  },
  background: {
    backgroundColor: "#1FDC75",
    minHeight: "100vh",
  },
};

const SuccessMsg = () => {
  return (
    <div style={{display: "flex",height: "90vh",alignItems: "center",justifyContent: "center"}}>
      <p style={{textAlign: "center",color: "white",fontSize: "1.6em"}}>A password reset link was sent. Please check your inbox.</p>
    </div>
  )
}

class ForgotPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSuccess: false
    }
  }

  setSuccess = () => {
    this.setState({isSuccess: true})
  }

  componentDidMount() {
    axios.get("/auth/user/me",{
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    }).then(res => {
      if (res.data.id > 0) {
        this.props.history.push("/");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div style={styles.background}>
        <div style={{ display: "flex", justifyContent: "left" }}>

        </div>
        <Row style={{ margin: 0 }}>
          <Col
            xs="12"
            sm="12"
            lg={{span: 6,offset: 3}}
            className="p-3"
            style={{ paddingRight: 0 }}
          >
            {this.state.isSuccess ? <SuccessMsg />:             <EmailForm onSuccess={this.setSuccess}/>}
            <h6 style={{ marginTop: "2%",textAlign: "center" }}>
              Have an account? <Link to="/login">Login</Link>
            </h6>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ForgotPassword;
