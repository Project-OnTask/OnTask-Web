import React, { useEffect } from 'react';
import SENDER from '../utils/SENDER';
import Spinner from 'react-bootstrap/Spinner'

const OutlookCodeExtract = props => {
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code") 
        if(code){
            SENDER.post("/users/"+localStorage.getItem("id")+"/add-outlook/"+code).then(
                res => {
                    if(res.status === 200){
                        window.close()
                    }
                }
            )
        }
        else{
            props.history.push('/')
        }
    })

    return (
        <div style={{height: "100vh",display: "flex",alignItems: "center",justifyContent: "center"}}>  
            <Spinner animation="border" role="status"/>
            <p>Processing..Please wait</p>
        </div>
    );
};

export default OutlookCodeExtract;