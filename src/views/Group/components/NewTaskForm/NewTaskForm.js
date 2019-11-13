import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SENDER from "../../../../utils/SENDER";

class NewTaskForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      name: "",
      isSubmitting: false,
      error: "",
      description: "",
      dueDate: "",
      startDate: new Date().toJSON().slice(0, 10)
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: "",isSubmitting: true  });
    if(!this.state.name || !this.state.description){
      this.setState({error: "Required fields are empty",isSubmitting: false})
    }
    else{
      SENDER.post("/tasks", {
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        startDate: this.state.startDate,
        createdBy: localStorage.getItem("id"),
        groupId: this.props.groupId
      })
        .then(res => {
          if (res.status === 200) {
            this.props.onAdd();
            this.setState({ isSubmitting: false });
            this.handleClose();
          }
        })
        .catch(err => {
          this.setState({ error: "There was an error. Please try again" });
          this.setState({ isSubmitting: false });
          console.error(err);
        });
    }
  };

  render() {
    return (
      <>
        <i
          onClick={this.handleShow}
          style={{
            cursor: "pointer",
            display: this.props.isAdmin ? "block" : "none",
            verticalAlign: "middle"
          }}
          className="fa fa-plus float-right"
        ></i>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Modal.Body>
              <p style={{ textAlign: "center", color: "red" }}>
                {this.state.error}
              </p>
              <Form.Group controlId="taskName">
                <Form.Label>Name<span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.state.name}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description<span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={this.state.description}
                  as="textarea"
                  rows={4}
                />
              </Form.Group>

              <Form.Group controlId="startDate">
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  min={new Date().toJSON().slice(0, 10)}
                  defaultValue={this.state.startDate}
                />
              </Form.Group>

              <Form.Group controlId="dueDate">
                <Form.Label>Due date</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date(this.state.startDate).toJSON().slice(0, 10)}
                  name="dueDate"
                  defaultValue={this.state.dueDate}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              {/* eslint-disable-next-line */}
              <a
                style={{ color: "red", cursor: "pointer" }}
                onClick={this.handleClose}
              >
                Cancel
              </a>
              <Button
                variant="success"
                disabled={this.state.isSubmitting}
                type="submit"
              >
                Create Task
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default NewTaskForm;
