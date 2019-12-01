import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "../../utils/useForm";
import axios from "axios";

const containerStyle = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#1FDC75",
    minHeight: "100vh"
  };

const formStyle = {
  padding: "5%",
  width: "50%",
  backgroundColor: "white",
}

const ResetPassword = props => {
    const {values,handleChange,handleSubmit} = useForm(resetPassword)
    const [isSubmitting,setSubmitting] = useState(false)
    var params = new URLSearchParams(props.location.search);

    useEffect( () => {
        axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
        axios
        .get("/auth/user/me")
        .then(res => {
          alert("You are already logged as "+res.data.fname + ". Try logout first")
          props.history.push("/")
        })
        .catch(err => {
          console.log("err: ", err);
        });

        if(params){
            axios.post('/auth/check-token/'+params.get('token')).then(
                res => {
                    if(!res.data){
                        props.history.push('/login')
                    }
                }
            )
        }
        else{
            props.history.push('/login')
        }
    },[params,props.history])

    function resetPassword(event){
        event.preventDefault()
        setSubmitting(true)
        console.log(values)             
        if( values.new_password === values.con_password){
            axios.post('/auth/reset-pwd',{
                password: values.new_password,
                token: params.get('token')
            }).then(
                res => {
                    if(res.status === 200){
                      props.history.push('/login')
                    }
                }
            ).catch(
                err => {
                  setSubmitting(false)
                  alert("Error happened. Please try again")
                }
            )
        }
            
        
    }

    return (
      <div style={containerStyle}>
           <Form onSubmit={handleSubmit} style={formStyle}>
        <h4 style={{ textAlign: "center" }}>Reset Your Password</h4>
        <Form.Text style={{ textAlign: "center", color: "red" }}>
          
        </Form.Text>
        <Form.Text style={{ textAlign: "center", color: "green" }}>
          
        </Form.Text>
        <Form.Group>
          <label>New password</label>
          <Form.Control
            type="password"
            name="new_password"
            onChange={handleChange}
          />
        </Form.Group>
          <Form.Group>
          <label>Confirm new password</label>
          <Form.Control
            type="password"
            name="con_password"
            onChange={handleChange}
          />
          </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="btns"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Processing.." : "Reset Password"}
          </Button>
        </div>
      </Form>

      </div>
         )
}

export default ResetPassword