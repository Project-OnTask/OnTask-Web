import React,{ useState, useEffect} from 'react'
import useForm from '../../../utils/useForm'
import SENDER from '../../../utils/SENDER'
import { Card,CardHeader,CardBody,Form,Input,Button,ListGroup} from 'reactstrap'
import SubTaskItem from './SubTaskItem'
import { Checklist } from "styled-icons/octicons/Checklist";

const SubTasks = props => {
    const [isExpanded,setIsExpanded] = useState(false)
    const [trig,setTrig] = useState(false)
    const {values,handleChange,handleSubmit} = useForm(createSubtask)
    const [subtasks,setSubtasks] = useState([])

    useEffect(
      () => {
        SENDER.get('/subtasks/task/'+props.taskId).then(
          res => {
            let i=0; 
            setSubtasks(res.data)
            i = res.data.filter( subtask => subtask.completed === true ).length
            props.sendSubTaskStats(i,res.data.length)
          }
        ).catch(err => console.log(err))
      },[props,trig]
    )

    function createSubtask(){
      SENDER.post('/subtasks',{
        addedBy: localStorage.getItem('id'),
        taskId: props.taskId,
        name: values.name
      }).then(res => {
        if(res.status === 200){
          setIsExpanded(false)
          setTrig(!trig)
        }
      }).catch(err => console.log(err))
    }

    function getMarkedSubtaskChange(){
      setTrig(!trig)
    }

    return (
        <Card style={{border: 0}}>
                <CardHeader style={{backgroundColor: "white"}}>
                  <Checklist size={20} />
                  <b>Subtasks</b>
                  <div className="card-header-actions">
                    <i
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                      className={isExpanded ? "fa fa-minus float-right" : "fa fa-plus float-right"}
                      onClick={() => setIsExpanded(!isExpanded)}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{padding: 0}}>
                <Form onSubmit={handleSubmit} inline style={{margin: "1%",display: isExpanded ? "block" : "none"}}>
                      <Input style={{width: "83%"}} name="name" onChange={handleChange} placeholder="Add subtask"></Input>
                      <Button color="success" style={{float: "right"}}>Add</Button>
                  </Form>
                  <ListGroup>
                    {subtasks.length > 0 ? subtasks.map( subtask => {
                      return <SubTaskItem 
                        taskId={props.taskId}
                        key={subtask.id}
                        id={subtask.id}
                        isComplete={subtask.completed}
                        notifySubtaskStatusChange={getMarkedSubtaskChange}
                        name={subtask.name}
                      />
                    }): <h6 style={{textAlign: "center",color: "gray",paddingTop: "4%"}}>Add subtasks to measure task completion status</h6>}
                  </ListGroup>
                </CardBody>
              </Card>
    )
}

export default SubTasks