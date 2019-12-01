import React,{ useState,useRef,useEffect} from 'react'
import './styles.css'
import { Camera } from "styled-icons/boxicons-solid/Camera";
import SENDER from "../../../../utils/SENDER";

const ProfilePicture = props => {
    const uploader = useRef(null);
  const [on, setOn] = useState(true);
  const [propic, setPropic] = useState([]);
  const showOv = () => {
    setOn(!on);
  };

    function fileChangedHandler(event) {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("name", event.target.files[0].name.replace(/(|)/g,"_"));
    
        SENDER.post(
          "/user/" + localStorage.getItem("id") + "/change-propic",
          formData
        )
          .then(res => {
            if (res.status === 200) {
              setOn(!on)
            }
          })
          .catch(err => console.log(err));
      }

      const showOpenFileDlg = () => {
        uploader.current.click();
      };
      
    useEffect(() => {
        SENDER.get("/user/" + props.id + "/pro-pic").then(
          res => {
            setPropic(res.data);
          }
        );
      },[props.id,on]);


    return (
        <div className="pro_pic_container" >
        <div        
          style={{ borderRadius: "50%",textAlign: "center" }}>
        {
          propic && propic.propicURL ? <img
          src={propic.propicURL}
          onMouseEnter={showOv}
          className="pro_pic"
          alt=""
          style={{ borderRadius: "10px",height: "40vh",width: "100%"}}
        />: <img  className="pro_pic" src={"https://www.gravatar.com/avatar/"+propic.emailHash+"?d=retro&s=214"} alt=""/>
        }
        </div>
        <div className="pro_pic_update_btn" style={{display: localStorage.getItem('id') === props.id ? "block" : "none"}}>
          <input
            ref={uploader}
            onChange={fileChangedHandler}
            accept="image/*"
            type="file"
            style={{ display: "none" }}
          />
          <Camera
            size="30"
            onClick={showOpenFileDlg}
            style={{color: "white",textAlign: "center"}}
            title="update profile photo"
          />
        </div>
      </div>
    )
}

export default ProfilePicture