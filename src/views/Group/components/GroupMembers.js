import React, { useEffect, useState } from 'react';
import {  CardHeader, ListGroupItem} from 'reactstrap'
import MemberItem from '../../../components/GroupMemberItem'
import SENDER from "../../../utils/SENDER";

const GroupMembers = props => {
    const [admins,setAdmins] = useState([])
    const [members,setMembers] = useState([])

    useEffect( () => {
        SENDER.get(`/member/${props.groupId}/admin`)
      .then(res => {
        setAdmins(res.data)
      })
      .catch(err => console.log(err));

      SENDER.get(`/member/${props.groupId}`)
      .then(res => {
        setMembers(res.data)
      })
      .catch(err => console.log(err));

    },[props.groupId])

    return (
      <>
        {/* <Card style={{ padding: 0,margin: 0, height: "84vh" }}>
    <CardBody style={{ padding: 0 }}>  */}
    <div style={{height: "83vh",paddingBottom: 0,backgroundColor: "white",display: "flex",flexDirection: "column"}}>
            <b style={{margin: "1% 1% 1% 3%"}}>Admins</b>
         
          {admins.map(admin => {
            const lname = admin.lname ? admin.lname : "";
            return (
              <MemberItem
                userId={admin.userId}
                groupId={props.groupId}
                m_role="admin"
                isAdmin={props.isAdmin}
                key={admin.fname}
                img={admin.propicURL}
                emailHash={admin.emailHash}
                name={admin.fname + " " + lname}
              />
            );
          })}
            <b  style={{margin: "1% 1% 1% 3%"}}>Members</b>
          {members.length > 0 ? (
           members.map(member => {
              const lname = member.lname ? member.lname : "";
              return (
                <MemberItem
                  userId={member.userId}
                  groupId={props.groupId}
                  isAdmin={props.isAdmin}
                  m_role="member"
                  key={member.fname}
                  emailHash={member.emailHash}
                  img={member.propicURL}
                  name={member.fname + " " + lname}
                />
              );
            })
          ) : (
              <div className="text-center" style={{padding: "3%"}}>
                No members.Invite someone to join the group
              </div>
          )}
    </div>
      {/*   </CardBody>
         </Card> */}
         </>
    );
};

export default GroupMembers;