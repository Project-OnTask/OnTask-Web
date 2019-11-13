//imports from NPM packages
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { withRouter,Link } from "react-router-dom";

//import logo
import Logo from "../../../assets/img/brand/logo.PNG";

const formStyle = {
  width: "100%",
  backgroundColor: "white",
  borderRadius: "10px",
  paddingBottom: "30%"
};

class EmailLogin extends Component {
  state = {
    email: "",
    password: "",
    EmailError: "",
    PasswordError: "",
    loginError: "",
    isDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.email === undefined ||
      (this.state.email && this.state.email.length === 0)
    ) {
      this.setState({ EmailError: "A valid email address is required" });
    } else if (
      this.state.password === undefined ||
      (this.state.password && this.state.password.length === 0)
    ) {
      this.setState({ PasswordError: "Please enter password" });
    } else {
      this.setState({ isDisabled: true, loginError: "" });
      axios
        .post("/auth/signin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accessToken);
            axios.defaults.headers["Authorization"] =
              "Bearer " + res.data.accessToken;
            axios.get("/auth/user/me").then(res => {
              localStorage.setItem("id", res.data.id);
              this.props.history.push("/");
            });
          }
        })
        .catch(err => {
          this.setState({ loginError: "Invalid attempt. Please try again" });
          this.setState({ isDisabled: false });
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={formStyle}>
        <Form onSubmit={this.handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2%",
            }}
          >
            <img src={Logo} alt="" height="100" width="100" />
          </div>
          <h4 style={{ textAlign: "center" }}>Login with Email</h4>
          {/* Displays any error that occurs when logging in */}
          <p style={{ color: "red", textAlign: "center" }}>
            {this.state.loginError}
          </p>
          {/* Email address */}
          <Form.Group>
            <label>Email Address</label>
            <Form.Control
              type="email"
              name="email"
              onChange={this.handleChange}
            />
            <Form.Text style={{ color: "red" }}>
              {this.state.EmailError}
            </Form.Text>
          </Form.Group>

{/* Password */}
          <Form.Group>
            <label>
              Password <Link to="/forgot-password">Forgot password?</Link>
            </label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Text style={{ color: "red" }}>
              {this.state.PasswordError}
            </Form.Text>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="success"
              style={{ width: "100%" }}
              type="submit"
              disabled={this.state.isDisabled}
            >
              {this.state.isDisabled ? "Logging you in" : "Log in"}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(EmailLogin);
