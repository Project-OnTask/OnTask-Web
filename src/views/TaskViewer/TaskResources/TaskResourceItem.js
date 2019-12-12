import React from "react";
import { ListGroupItem } from "reactstrap";
import getFileTypeIcon from "../../../utils/FileTypeIcon";

const styles = {
    container: { display: "flex", flexDirection: "row" },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        height: "3vh",
        alignItems: "center",
        marginLeft: "0%",
        marginRight: "2%",
      }
}

const TaskResItem = props => {
  return (
    <ListGroupItem
      action
      style={styles.container}
      tag="a"
      href={props.src}
    >
      <div
        style={styles.imageContainer}
      >
        {getFileTypeIcon(props.type)}
      </div>
      <div>
        <h6 style={{margin: 0,color: "black"}}>
          <b>{props.name.length > 40 ? `${props.name.slice(0,25)}...` : props.name}</b>
        </h6>
        <i className="fa fa-calendar" />{" "}
                          <b>{props.cdate}</b>
                          <i
                            className="fa fa-user"
                            style={{ marginLeft: "5%" }}
                          />{" "}
                          <b>{props.addedBy}</b>
      </div>
    </ListGroupItem>
  );
};

export default TaskResItem;
