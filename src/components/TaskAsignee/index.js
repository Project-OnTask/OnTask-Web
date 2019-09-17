import React,{ useState, useEffect} from 'react'
import useForm from '../../utils/useForm'
import SENDER from '../../utils/SENDER'
import { Card,CardHeader,CardBody,Form,Input,Button,ListGroup} from 'reactstrap'
import TaskAsigneeItem from './TaskAsigneeItem'
import { Checklist } from "styled-icons/octicons/Checklist";
import MemberSearchItem from "../MemberSearchItem";

const SubTasks = props => {
    const [isExpanded,setIsExpanded] = useState(false)
    const [trig,setTrig] = useState(false)
    const [asignees,setAsignees] = useState([])
    const [searchResults,setSearchResults] = useState([])
    const [groupId,setGroupId] = useState(0)

    function handleChange(e){
      SENDER.get('/member/'+groupId+"/search/"+e.target.value).then(
        res => {
          console.log(res.data)
          setSearchResults(res.data)
        }
      ).catch(err => console.log(err))
    }

    function addAsignee(data){
      console.log("addd")
      const newSR = searchResults.filter(function(value, index, arr){

        return value !== data;
    });
    SENDER.post('/task-asignee',{
          taskId: props.taskId,
          groupId: props.groupId,
          userId: data.userId,
          addedById: localStorage.getItem('id')
        }).then(res => {
          if(res.status === 200){
            alert(data.fname + " was assigned to task")
            setIsExpanded(false)
          }
        }).catch(err => console.log(err))
    setSearchResults(newSR)
    setTrig(!trig)
    console.log(newSR)
        }

    function onRemove(){
      setTrig(!trig)
    }

    useEffect(
      () => {
        SENDER.get('/tasks/'+props.taskId).then(
          res => setGroupId(res.data.id)
        ).catch(err => console.log(err))

        SENDER.get('/task-asignee/'+props.taskId).then(
          res => {
            setAsignees(res.data)
          }
        ).catch(err => console.log(err))
      },[trig]
    )
    return (
        <Card>
                <CardHeader>
                  <Checklist size={20} />
                  <b>Asignees</b>
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
                      <Input name="name" style={{display: isExpanded ? "block" : "none"}} onChange={handleChange} placeholder="Search group members"></Input>
                  <ListGroup>
                  {searchResults.map( result => {
              const lname = result.lname ? result.lname : ""
              return <MemberSearchItem
                key={result.userId}
                id={result.userId}
                data={result}
                selectMember={addAsignee}
                name={result.fname+""+lname}
              ></MemberSearchItem>
            })}
                    {asignees.length > 0 ? asignees.map( asignee => {
                      const lname = asignee.lname ? asignee.lname : ""
                      return <TaskAsigneeItem 
                        key={asignee.userId}
                        id={asignee.userId}
                        taskId={props.taskId}
                        propic={asignee.propic}
                        onRemove={onRemove}
                        name={asignee.fname+""+lname}
                      />
                    }): <h6 style={{textAlign: "center",color: "gray",paddingTop: "2%"}}>No asignees</h6>}
                  </ListGroup>
                </CardBody>
              </Card>
    )
}

export default SubTasks