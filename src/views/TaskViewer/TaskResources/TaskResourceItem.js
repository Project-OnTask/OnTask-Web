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
        <h6 style={{margin: 0}}>
          <b>{props.name.length > 40 ? `${props.name.slice(0,40)}...` : props.name}</b>
        </h6>
        <p>
          added by <b>{props.addedBy}</b> on <b>{props.cdate}</b>
        </p>
      </div>
    </ListGroupItem>
  );
};

export default TaskResItem;
