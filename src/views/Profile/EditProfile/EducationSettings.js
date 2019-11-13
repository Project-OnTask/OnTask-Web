import React, { useState, useEffect } from "react";
import useForm from '../../../utils/useForm'
import { Row, Col, Input, Form, FormGroup, Label } from "reactstrap";
import EducationItem from '../components/EducationItem'
import SENDER from '../../../utils/SENDER'

const EducationSettings = () => {
  const [isFormVisible,setFormVisible] = useState(false)
  const [isStudying,setIsStudying] = useState(false)
  const [education,setEducation] = useState([])
  const {values,handleChange,handleSubmit} = useForm(addEducation)
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function addEducation(){
    let data = {}
    data.userId = parseInt(localStorage.getItem('id'))
        data.institute = values.institute 
        data.from  = values.from
        data.description = values.description
        data.to = values.to
        data.isStudying = isStudying
    SENDER.post('/user/education',data).then(
        res => {
          setErrMsg("")
          setSuccessMsg("Updated successfully.");
        }
    ).catch(err => {
      setSuccessMsg("")
        setErrMsg("An error occured. Please try again.")
      console.log(err) 
    })
  }

  function handleCheckBox(e){
    setIsStudying(e.target.checked)
  }
  useEffect(
    () => {
      SENDER.get('/users/'+localStorage.getItem('id')+'/education').then(
        res => {
          setEducation(res.data)
        })
    },[]
  )

  return (
    <>
      <div style={{display: "flex",flexDirection: "row"}}>
        <h5>Education</h5>
        <div style={{flexGrow: 1}} />
        <p style={{cursor: "pointer",color: "blue"}} onClick={() => setFormVisible(!isFormVisible)}>{isFormVisible ? "Hide Form" : "Add new Education"}</p>
      </div>
      <div style={{display: successMsg || errMsg ? "block" : "none"}}>
        <p style={{display: successMsg ? "block" : "none",color: "green"}}>{successMsg}</p>
        <p style={{display: errMsg ? "block" : "none",color: "red"}}>{errMsg}</p>
      </div>
      {education.map( EduItem => 
            <EducationItem 
              institute={EduItem.institute}
              from={EduItem.startDate}
              to={EduItem.endDate}
              description={EduItem.description}
            />)}

        <Form style={{display: isFormVisible ? "block" : "none"}} onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="institute">Institute</Label>
          <Input type="text" name="institute" onChange={handleChange}/>
        </FormGroup>
          <Row>
            <Col>
            <FormGroup>
          <Label for="from">Attended from</Label>
          <Input type="date" name="from" onChange={handleChange}/>
        </FormGroup>
            </Col>
            <Col>
            <FormGroup>
          <Label for="to">To</Label>
          <Input type="date" name="to" onChange={handleChange}/>
        </FormGroup>
            </Col>
          </Row>
          <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" onChange={handleChange}/>
        </FormGroup>
          <FormGroup check>
          <Label check>
            <Input type="checkbox" name="isWorking" onChange={handleCheckBox} />{' '}
            Currently studying here
          </Label>
        </FormGroup>
        <div style={{display: "flex",flexDirection: "row"}}>
        <p onClick={() => setFormVisible(false)} style={{color: "red",cursor: "pointer",marginTop: "0.5%",marginRight: "0.5%"}}>Cancel</p>
        <Input type="submit" style={{backgroundColor: "#12CD67",color: "white",width: "20%"}}/>
        </div>
        </Form>
    </>
  );
};

export default EducationSettings;
