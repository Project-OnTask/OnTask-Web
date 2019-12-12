import React from 'react'
import { Card,CardBody} from 'reactstrap'

const EducationItem = props => {
    return (
        <Card style={{border: "none"}}>
            <CardBody style={{padding: "1%",paddingTop: 0}}>
                <h5>{props.institute}</h5>
                <p style={{color: "gray"}}>From <b>{props.from.slice(0,10)}</b> - <b>{props.to ? props.to.slice(0,10) : "Present"}</b></p>

                <p>{props.description}</p>
            </CardBody>
        </Card>
    )
}

export default EducationItem