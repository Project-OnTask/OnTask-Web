import React from 'react';
import ReactMarkdown from 'react-markdown'
import moment from "moment";

const styles = {
  container: {display: "flex",flexDirection: "row"},
  imgContainer: {marginRight: "1%"},
  author: {margin: 0}
}

const Comment = props => {

    //Calculate the difference between today and created day
    const fromNow =  moment(new Date(props.createdAt)).fromNow()

    return (
        <div style={styles.container}>
            <div style={styles.imgContainer}>
            {props.img ? (
          <img
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
            <p style={styles.author}><b>{props.fname}</b> &#xB7; <span style={{color: "gray"}}>{fromNow}</span></p>
            <div>
            <ReactMarkdown source={props.content} />
            
</div>
            </div>
        </div>
    );
};

export default Comment;