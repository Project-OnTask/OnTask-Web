import React,{ useState, useEffect} from 'react'
import SENDER from '../../../utils/SENDER'
import { Card,CardHeader,CardBody,Input,ListGroup} from 'reactstrap'
import TaskAsigneeItem from './TaskAsigneeItem'
import { User } from "styled-icons/boxicons-regular/User";
import MemberSearchItem from "../../../components/MemberSearchItem";

const SubTasks = props => {
    const [isExpanded,setIsExpanded] = useState(false)
    const [trig,setTrig] = useState(false)
    const [asignees,setAsignees] = useState([])
    const [searchResults,setSearchResults] = useState([])

    useEffect(
      () => {

        SENDER.get('/task-asignee/'+props.taskId).then(
          res => {
            setAsignees(res.data)
          }
        ).catch(err => console.log(err))
      },[trig,props.taskId]
    )
    
    function handleChange(e){
      SENDER.get('/member/'+props.groupId+"/search/"+e.target.value).then(
        res => {
          setSearchResults(res.data)
        }
      ).catch(err => console.log(err))
    }

    function addAsignee(data){
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
            setTrig(!trig)
            setIsExpanded(false)
          }
        }).catch(err => console.log(err))
    setSearchResults(newSR)
    setTrig(!trig)
        }

    function onRemove(){
      setTrig(!trig)
    }

    return (
        <Card style={{border: "none"}}>
                <CardHeader>
                  <User size={20} />
                  <b>Assignees</b>
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
                  <ListGroup style={{marginTop: "2%",marginRight: "2%",marginLeft: "1%",marginBottom: "1%"}}>
                  {searchResults.map( result => {
              const lname = result.lname ? result.lname : ""
              return <MemberSearchItem
                key={result.userId}
                id={result.userId}
                data={result}
                selectMember={addAsignee}
                name={result.fname+" "+lname}
              ></MemberSearchItem>
            })}
                    {asignees.length > 0 ? asignees.map( asignee => {
                      const lname = asignee.lname ? asignee.lname : ""
                      return <TaskAsigneeItem 
                        key={asignee.userId}
                        userId={asignee.userId}
                        taskId={props.taskId}
                        emailHash={asignee.emailHash}
                        propic={asignee.propic}
                        onRemove={onRemove}
                        name={asignee.fname+" "+lname}
                      />
                    }): <h6 style={{textAlign: "center",color: "gray",paddingTop: "2%"}}>No asignees</h6>}
                  </ListGroup>
                </CardBody>
              </Card>
    )
}

export default SubTasks