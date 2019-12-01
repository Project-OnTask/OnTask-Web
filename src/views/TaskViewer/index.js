import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router-dom";
import TaskAsignee from "./TaskAsignee";
import TaskDiscussion from "./TaskDiscussion";
import TaskResources from "./TaskResources";
import SubTasks from "./SubTasks";
import TaskActivity from "./TaskActivity";
import SENDER from "../../utils/SENDER";
import { Clock } from "styled-icons/feather/Clock";
import { Description } from "styled-icons/material/Description";
import { Microsoft } from "styled-icons/boxicons-logos/Microsoft";
import { Tick } from "styled-icons/typicons/Tick";
import "./taskviewer.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  DropdownToggle,
} from "reactstrap";
import axios from 'axios'

const TaskViewer = props => {
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [subtaskTotal, setSubtaskTotal] = useState(1);
  const [percentage, setPercentage] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [isAddingOutlook,setOutlookStatus] = useState(true)
  const [outlookCode,setOutlookCode] = useState("")
  const [desEditable, setDesEditable] = useState(false);
  const [EditTaskInfo, setEditTaskInfo] = useState(false);
  const desc = useRef(null);

  useEffect(() => {
    if (props.i) {
      setShow(true);
    }

    SENDER.get("/tasks/" + props.taskId)
      .then(res => {
        setTask(res.data);
        setDescription(res.data.description);
        if(res.data.completed){
          setPercentage(100)
        }
      })
      .catch(err => console.log(err));    
      
      if(props.groupId){

        SENDER.get("/groups/"+props.groupId+"/name")
      .then(res => {
        setGroupName(res.data)
      })
      .catch(err => console.log(err));

      SENDER.get("/member/"+props.groupId+"/is-admin/"+localStorage.getItem('id'))
      .then(res => {
        setIsUserAdmin(res.data)
      })
      .catch(err => console.log(err));

      }

    SENDER.get('/users/'+localStorage.getItem('id')+"/outlook").then(
      res => {
        console.log("outlook: ",res.data)
        setOutlookCode(res.data)
      }
    ).catch(err => console.log("Outlook Error: "+err))
    
  }, [props.i, props.taskId,props.groupId,trigger]);

  function deleteTask() {
    if (window.confirm("All task data will be permanently deleted.Continue?")) {
      SENDER.delete("/tasks/" + props.taskId)
        .then(res => {
          alert("Task Deleted");
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  }

  function handleDesChange() {
    setDesEditable(false);
    SENDER.post("/tasks/edit-desc", {
      editedBy: localStorage.getItem("id"),
      taskId: props.taskId,
      description: desc.current.innerText,
    })
      .then(res => console.log("Description Updated"))
      .catch(err => alert("Error"));
  }

  const closeModal = () => {
    setShow(false);
  };

  function addToOutlook(){
    if(outlookCode){
      const getTokenURL = `https://login.microsoftonline.com/common/oauth2/v2.0/token?scope=user.read%20Calendars.ReadWrite&redirect_uri=http%3A%2F%2Flocalhost%2F3000%2Foutlook`

      const params = new URLSearchParams();
      
      params.append('grant_type', 'authorization_code');
      params.append('code', outlookCode);
      params.append('client_id',process.env.REACT_APP_OUTLOOK_APP_ID);
      params.append('client_secret', process.env.REACT_APP_OUTLOOK_SECRET_KEY);
      
      console.log(params)
      setOutlookStatus(true)
      axios.post(getTokenURL, params,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => 
        console.log(res.data)
      ).catch(
        err => {
          setOutlookStatus(false)
          alert("There was an error when integrating with Outlook. Please try again.")
          console.log(err)
        })
    }
    else{
      alert("This account has not been connected to Outlook.")
    }  
}

  const getSubTaskStats = (completed, total) => {
    setSubtaskTotal(total);
    if (total !== 0) {
      const value = (completed / total) * 100;
      setPercentage(value);
    }
  };

  function editDueDate(e) {
    SENDER.post("/tasks/" + props.taskId + "/edit-due", {
      editedBy: localStorage.getItem("id"),
      date: e.target.value,
    })
      .then(res => {
        setEditTaskInfo(false);
      })
      .catch(err => console.log(err));
  }

  function toggleTaskCompletedStatus() {
    SENDER.post(
      "/tasks/completed/" + localStorage.getItem("id") + "/" + props.taskId
    )
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          if (res.data) {
            getSubTaskStats(1, 1);
            setTrigger(!trigger)
          } else {
            getSubTaskStats(0, 1);
          }
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={closeModal}
        backdrop="static"
        dialogClassName="task_viewer_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>
                {props.name}{" "}
                <span style={{ color: "gray", fontSize: "0.8em" }}>
                  in {props.groupName || groupName}
                </span>
              </h3>
              <UncontrolledDropdown
                direction="right"
                style={{ marginTop: "-1.5%",display: isUserAdmin || props.isAdmin ? "block" : "none" }}
              >
                <DropdownToggle nav style={{}}>
                  <i className="fa fa-ellipsis-h"></i>
                </DropdownToggle>
                <DropdownMenu left="true">
                  <DropdownItem style={{ border: 0 }}>
                    Add to another group
                  </DropdownItem>
                  <DropdownItem style={{ border: 0 }} onClick={deleteTask}>
                    Delete Task
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginTop: "0.5%" }}>
            <Col xs="12" sm="12" lg="3">
              <Card style={{ border: 0, padding: 0 }}>
                <CardHeader
                  style={{
                    backgroundColor: "white",
                    borderBottom: 0,
                    padding: 0,
                  }}
                >
                  <div className="card-header-actions">
                    <i
                      className="fa fa-edit float-right"
                      title="Edit"
                      onClick={() => setEditTaskInfo(!EditTaskInfo)}
                      style={{
                        cursor: "pointer",
                        display: isUserAdmin || props.isAdmin ? "block" : "none"
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "1%",
                    }}
                  >
                    <h6
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        height: "3vh",
                        alignItems: "center",
                      }}
                    >
                      <Clock size={20} style={{ paddingRight: "3.5%" }} />
                      <b>Due </b>{" "}
                      {EditTaskInfo ? (
                        <Input type="date" onChange={editDueDate} />
                      ) : (
                        task.dueDate
                      )}
                    </h6>
                  </div>
                 
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "1%",
                    }}
                  >
                    <Microsoft size={15} />
                    <h6 style={{ marginLeft: "2.5%",cursor: "pointer", opacity: isAddingOutlook ? 0.2 : 1}} onClick={addToOutlook}>Add to Outlook</h6>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "1%",
                    }}
                  >
                    <Tick
                      size={20}
                      style={{ display: subtaskTotal === 0 ? "block" : "none" }}
                    />
                    <h6
                      style={{
                        display: subtaskTotal === 0 ? "block" : "none",
                        marginLeft: "1%",
                        cursor: "pointer",
                      }}
                      onClick={toggleTaskCompletedStatus}
                    >
                      {task.completed
                        ? "Mark as not completed"
                        : "Mark as completed"}
                    </h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value={percentage}
                    />
                  </div>
                </CardBody>
              </Card>

              <TaskResources taskId={props.taskId} />

              <TaskAsignee
                isAdmin={props.isAdmin || isUserAdmin}
                taskId={props.taskId}
                groupId={props.groupId}
              />
            </Col>
            <Col xs="12" sm="12" lg="5">
              <Card>
                <CardHeader>
                  <Description size={20} />
                  <b>Description</b>
                  <div className="card-header-actions">
                    <i
                      className="fa fa-edit float-right"
                      onClick={() => setDesEditable(true)}
                      title="Edit description"
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin || isUserAdmin? "block" : "none",
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: "1%" }}>
                  <div
                    ref={desc}
                    contentEditable={desEditable}
                    suppressContentEditableWarning={true}
                    style={{
                      border: desEditable ? "1px solid gray" : "none",
                      padding: "3%",
                      textAlign: "justify",
                      borderRadius: "5px",
                    }}
                  >
                    {description}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      style={{
                        marginTop: "1%",
                        display: desEditable ? "block" : "none",
                      }}
                      onClick={handleDesChange}
                      color="success"
                    >
                      update
                    </Button>
                    <p
                      style={{
                        margin: "3% 0% 0% 1%",
                        color: "red",
                        display: desEditable ? "block" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        desc.current.innerText = description;
                        setDesEditable(false);
                      }}
                    >
                      Cancel
                    </p>
                  </div>
                </CardBody>
              </Card>
              <TaskActivity taskId={props.taskId} />
            </Col>
            <Col xs="12" sm="12" lg="4">
              <SubTasks
                isAdmin={props.isAdmin || isUserAdmin}
                isAssigned={props.isAssigned}
                taskId={props.taskId}
                sendSubTaskStats={getSubTaskStats}
              />
              <TaskDiscussion taskId={props.taskId} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(TaskViewer);
