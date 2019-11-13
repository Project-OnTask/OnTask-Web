import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "react-tabs/style/react-tabs.css";
import { withRouter } from "react-router-dom";
import EmailSignup from "./email";
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
    // background: "linear-gradient(180deg, #1117e1 50%, #FFFFFF 50%)",
    backgroundColor: "#1FDC75",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  minHeight: "100vh" 
  },
};

const SuccessMsg = props => {
  return (<div style={{textAlign: "center"}}>
    <h4>Almost there..</h4>
    <p>Please check your email <b>({props.email})</b>
to confirm your account.</p>
<hr />
<p>If <b>{props.email}</b> is not your email address, please go back and enter the correct one.</p>

<p>If you haven't received our email in 15 minutes, please check your spam folder.</p>

<p>Still can't find it? Try searching Gmail for in:all subject:(OnTask - Confirm email)</p>
  </div>)
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      isSuccess: false
    }
  }

  setSuccess = (isSignupSuccess,email) => {
    this.setState({isSuccess: isSignupSuccess,userEmail: email})
  }
  
  componentDidMount() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div style={styles.background}>
        {this.state.isSuccess ? <SuccessMsg 
          email={this.state.userEmail}
        />: 
                          <EmailSignup onSuccessfulSignup={this.setSuccess}/>}
                  <h6 style={{marginTop: "1%",textAlign: "center"}}>Have an account? <Link to="/login">Login</Link></h6>  
      </div>
    );
  }
}

export default withRouter(Signup);
