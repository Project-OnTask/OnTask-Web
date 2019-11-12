import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadingComponent from '../components/LoadingComponent/LoadingComponent'
import axios from "axios";

export default function requireAuth(WrappedComponent) {
  class Authentication extends Component {
    state = {
      isAuth: false,
    };

    componentDidMount() {
      axios.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get("/auth/user/me")
        .then(res => {
          localStorage.setItem("id", res.data.id);
          this.setState({isAuth: true})
        })
        .catch(err => {
          console.log("err: ", err);
          this.props.history.push("/login")
        });
    }

    componentDidUpdate(prevProps){
      if(prevProps !== this.props){
        axios.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get("/auth/user/me")
        .then(res => {
          localStorage.setItem("id", res.data.id);
          this.setState({isAuth: true})
        })
        .catch(err => {
          console.log("err: ", err);
          this.props.history.push("/login")
        });
      }
    }

    render() {
        return(
           this.state.isAuth ? <WrappedComponent {...this.props} /> : <></>
        )
    }
  }

  return withRouter(Authentication);
}
