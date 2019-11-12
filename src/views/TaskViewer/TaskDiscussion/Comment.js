import React from 'react';
import ReactMarkdown from 'react-markdown'
import moment from "moment";

const Comment = props => {

    const fromNow =  moment(new Date(props.createdAt)).fromNow()

    return (
        <div style={{display: "flex",flexDirection: "row"}}>
            <div style={{marginRight: "1%"}}>
            {props.img ? (
          <img
            style={{ borderRadius: "50%" }}
            className="img-avatar"
            width="25"
            height="25"
            src={props.img}
            alt=""
          />
        ) : (
          <img
            className="img-avatar"
            width="25"
            height="25"
            src={
              "https://www.gravatar.com/avatar/" +
              props.emailHash +
              "?d=retro&s=25"
            }
            alt=""
          />
        )}
            </div>
            <div>
            <p style={{margin: 0}}><b>{props.fname}</b> &#xB7; <span style={{color: "gray"}}>{fromNow}</span></p>
            <div>
            <ReactMarkdown source={props.content} />
            
</div>
            </div>
        </div>
    );
};

export default Comment;