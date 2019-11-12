import React,{ useState,useRef, useEffect } from 'react'
import SENDER from '../../../utils/SENDER'
import { File } from "styled-icons/boxicons-regular/File";
import { Card, CardBody, CardHeader } from "reactstrap";
import TaskResItem from "./TaskResourceItem"

const TaskResources = props => {
    const [resources, setResources] = useState([]);
    const [isUploaded,setUploadStatus] = useState(false)
    const TaskResUploader = useRef(null);
    const [feedback,setFeedback] = useState("")


    useEffect(() => {
        SENDER.get("/task_resources/" + props.taskId)
        .then(res => {
          setResources(res.data);
        })
        .catch(err => console.log(err));
    },[isUploaded,props.taskId])

    function fileChangedHandler(event) {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("name", event.target.files[0].name.replace(/(|)/g,"_"));
    
        SENDER.post(
          "/task_resources/" +
            parseInt(localStorage.getItem("id")) +
            "/" +
            parseInt(props.taskId),
          formData
        )
          .then(res => {
            if (res.status === 200) {
              setUploadStatus(true)
              setFeedback("uploaded successfully")
            }
          })
          .catch(err => {
              setUploadStatus(false)
              setFeedback("There was an error. Please try again.")
          });
      }
      
  const showOpenFileDlg = () => {
    TaskResUploader.current.click();
  };

  return(
      <>
<p style={{color: isUploaded ? "green" : "red",textAlign: "center"}}>{feedback}</p>
<Card className="border-0">
                <CardHeader style={{backgroundColor: "white"}}>
                  <File size={20} />
                  <b>Resources</b>
                  <div className="card-header-actions">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa fa-plus float-right"
                      onClick={showOpenFileDlg}
                    />
                    <input
                      ref={TaskResUploader}
                      onChange={fileChangedHandler}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: 0 }}>
                  {resources.length > 0 ? resources.map(resource => {
                    return (
                      <TaskResItem
                        key={resource.taskResId}
                        src={resource.uri}
                        name={resource.uri.split("/")[5].replace(/%20/g, "_")}
                        type={resource.uri.split(".")[1].toLowerCase()}
                        addedBy={resource.username}
                        cdate={resource.addedOn.slice(0, 10)}
                      />
                    );
                  }) : <p style={{textAlign: "center",color: "gray",padding: "3%"}}>No resources</p>}
                </CardBody>
              </Card>
              
      </>
  )
}

export default TaskResources